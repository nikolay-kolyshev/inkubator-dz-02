import { Request, Response } from 'express';
import { JwtService } from '../../application/jwt/jwt.service';
import { STATUS_CODES } from '../../common/constants';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './auth.dto';
import { AuthLoginView, GetMeView } from './auth.views';

export class AuthController {
    static async postLogin(req: Request<{}, void, AuthLoginDto>, res: Response<AuthLoginView>) {
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
}
