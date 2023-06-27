import { Request, Response } from 'express';
import { JwtService } from '../../application/jwt/jwt.service';
import { STATUS_CODES } from '../../common/constants';
import { UsersQueryRepository } from '../users/users.query-repository';
import { UsersService } from '../users/users.service';
import {
    AuthLoginInputDto,
    AuthRegistrationConfirmationInputDto,
    AuthRegistrationEmailResendingInputDto,
    AuthRegistrationInputDto,
} from './auth.dto';
import { AuthService } from './auth.service';
import { AuthLoginView, AuthRefreshTokenView, GetMeView } from './auth.views';
import {REFRESH_TOKEN_COOKIE_NAME} from "./auth.constants";

export class AuthController {
    /**
     * @description method POST
     */
    static async login(req: Request<{}, void, AuthLoginInputDto>, res: Response<AuthLoginView>) {
        const { loginOrEmail, password } = req.body;
        const user = await UsersService.checkCredentials({ loginOrEmail, password });
        if (user === null) {
            res.sendStatus(STATUS_CODES.UNAUTHORIZED);
            return;
        }
        const accessToken = await JwtService.createAccessJwtToken(user);
        const refreshToken = await JwtService.createRefreshJwtToken(user);
        res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
            httpOnly: true,
            secure: true,
        });
        res.status(STATUS_CODES.OK).send({
            accessToken,
        });
        return;
    }

    /**
     * @description method GET
     */
    static async getMe(req: Request<{}, void, {}>, res: Response<GetMeView>) {
        const userId = req.userId.toString();
        const user = await UsersService.getById(userId);
        if (!user) {
            res.sendStatus(STATUS_CODES.UNAUTHORIZED);
        }
        res.status(STATUS_CODES.OK).json({
            email: user?.email ?? '',
            login: user?.login ?? '',
            userId: user?.id ?? '',
        });
        return;
    }

    /**
     * @description method POST
     */
    static async registration(req: Request<{}, void, AuthRegistrationInputDto>, res: Response<void>) {
        const userCreationResult = await AuthService.registration(req.body);
        if (userCreationResult === null) {
            res.sendStatus(STATUS_CODES.BAD_REQUEST);
            return;
        }
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }

    /**
     * @description method POST
     */
    static async registrationConfirmation(
        req: Request<{}, void, AuthRegistrationConfirmationInputDto>,
        res: Response<void>,
    ) {
        const emailConfirmationResult = await AuthService.registrationConfirmation(req.body.code);
        if (emailConfirmationResult === null) {
            res.sendStatus(STATUS_CODES.BAD_REQUEST);
            return;
        }
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }

    /**
     * @description method POST
     */
    static async registrationEmailResending(
        req: Request<{}, void, AuthRegistrationEmailResendingInputDto>,
        res: Response<void>,
    ) {
        const emailResendingResult = await AuthService.registrationEmailResending(req.body.email);
        if (emailResendingResult === null) {
            res.sendStatus(STATUS_CODES.BAD_REQUEST);
            return;
        }
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }

    /**
     * @description method POST
     */
    static async refreshToken(req: Request<{}, void, {}>, res: Response<AuthRefreshTokenView>) {
        const token = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
        const resOperation = await AuthService.addRefreshTokenToBannedJwtTokens(token);
        if (!resOperation) {
            res.sendStatus(STATUS_CODES.BAD_REQUEST);
            return;
        }
        const user = await UsersQueryRepository.findUserEntityById(req.userId);
        if (!user) {
            res.sendStatus(STATUS_CODES.BAD_REQUEST);
            return;
        }
        const accessToken = await JwtService.createAccessJwtToken(user);
        const refreshToken = await JwtService.createRefreshJwtToken(user);
        res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
            httpOnly: true,
            secure: true,
        });
        res.status(STATUS_CODES.OK).send({
            accessToken,
        });
        return;
    }

    /**
     * @description method POST
     */
    static async logout(req: Request<{}, void, {}>, res: Response<AuthRefreshTokenView>) {
        const token = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
        const resOperation = await AuthService.addRefreshTokenToBannedJwtTokens(token);
        if (!resOperation) {
            res.sendStatus(STATUS_CODES.BAD_REQUEST);
            return;
        }
        res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }
}
