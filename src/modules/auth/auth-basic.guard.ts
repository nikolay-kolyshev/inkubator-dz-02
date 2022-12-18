import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../../common/constants';
import { AuthType, BASIC_AUTH_CREDENTIALS } from './auth.constants';

export const authBasicGuard = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(STATUS_CODES.UNAUTHORIZED);
    }
    const [type, token] = authHeader.split(' ') as [AuthType, string];
    if (type.toLowerCase() !== AuthType.Basic) {
        return res.sendStatus(STATUS_CODES.UNAUTHORIZED);
    }
    const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = decodedToken.split(':');
    if (username !== BASIC_AUTH_CREDENTIALS.username || password !== BASIC_AUTH_CREDENTIALS.password) {
        return res.sendStatus(STATUS_CODES.UNAUTHORIZED);
    }
    return next();
};
