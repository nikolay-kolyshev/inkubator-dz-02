import { Request, Response } from 'express';
import { JwtService } from '../../application/jwt/jwt.service';
import { STATUS_CODES } from '../../common/constants';
import { UsersService } from '../users/users.service';
import {
    AuthLoginInputDto,
    AuthRegistrationConfirmationInputDto,
    AuthRegistrationEmailResendingInputDto,
    AuthRegistrationInputDto,
} from './auth.dto';
import { AuthService } from './auth.service';
import { AuthLoginView, GetMeView } from './auth.views';

export class AuthController {
    static async postLogin(req: Request<{}, void, AuthLoginInputDto>, res: Response<AuthLoginView>) {
        const { loginOrEmail, password } = req.body;
        const user = await UsersService.checkCredentials({ loginOrEmail, password });
        if (user === null) {
            res.sendStatus(STATUS_CODES.UNAUTHORIZED);
            return;
        }
        const token = await JwtService.createJwt(user);
        res.status(STATUS_CODES.OK).send({
            accessToken: token,
        });
        return;
    }
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

    static async registration(req: Request<{}, void, AuthRegistrationInputDto>, res: Response<void>) {
        const userCreationResult = await AuthService.registration(req.body);
        if (userCreationResult === null) {
            res.sendStatus(STATUS_CODES.BAD_REQUEST);
            return;
        }
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }

    static async registrationConfirmation(
        req: Request<{}, void, AuthRegistrationConfirmationInputDto>,
        res: Response<void>,
    ) {
        const emailConfirmationResult = await AuthService.registrationConfirmation(req.body.code, req.userId);
        if (emailConfirmationResult === null) {
            res.sendStatus(STATUS_CODES.BAD_REQUEST);
            return;
        }
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }

    static async registrationEmailResending(
        req: Request<{}, void, AuthRegistrationEmailResendingInputDto>,
        res: Response<void>,
    ) {
        const emailResendingResult = await AuthService.registrationEmailResendingByUserId(req.body.email, req.userId);
        if (emailResendingResult === null) {
            res.sendStatus(STATUS_CODES.BAD_REQUEST);
            return;
        }
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }
}
