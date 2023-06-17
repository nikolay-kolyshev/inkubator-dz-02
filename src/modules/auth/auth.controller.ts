import { Request, Response } from 'express';
import { JwtService } from '../../application/jwt/jwt.service';
import { STATUS_CODES } from '../../common/constants';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './auth.dto';

export class AuthController {
    static async postLogin(req: Request<{}, void, AuthLoginDto>, res: Response<object>) {
        const { loginOrEmail, password } = req.body;
        const user = await UsersService.checkCredentials({ loginOrEmail, password });
        if (user === null) {
            res.sendStatus(STATUS_CODES.UNAUTHORIZED);
            return;
        }
        const token = JwtService.createJwt(user);
        res.status(STATUS_CODES.CREATED).send({
            accessToken: token,
        });
        return;
    }
    static async getMe(req: Request<{}, void, {}>, res: Response<void>) {
        const userId = req.userId.toString();
        const user = await UsersService.getById(userId);
        if (!user) {
            res.sendStatus(STATUS_CODES.UNAUTHORIZED);
        }
        return {
            email: user?.email,
            login: user?.login,
            userId: user?.id,
        };
    }
}
