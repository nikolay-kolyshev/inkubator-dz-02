import { Request, Response } from 'express';
import { STATUS_CODES } from '../../common/constants';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './auth.dto';

export class AuthController {
    static async postLogin(req: Request<{}, void, AuthLoginDto>, res: Response<void>): Promise<void> {
        const { loginOrEmail, password } = req.body;
        const isAuth = await UsersService.checkCredentials({ loginOrEmail, password });
        if (!isAuth) {
            res.sendStatus(STATUS_CODES.UNAUTHORIZED);
            return;
        }
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }
}
