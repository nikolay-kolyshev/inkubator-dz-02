import { NextFunction, Request, Response } from 'express';
import { AuthType, AUTH_CREDENTIALS } from './auth.constants';

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401);
    }
    const [type, token] = authHeader.split(' ') as [AuthType, string];
    if (type.toLowerCase() !== AuthType.Basic) {
        return res.sendStatus(401);
    }
    const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = decodedToken.split(':');
    if (username !== AUTH_CREDENTIALS.username || password !== AUTH_CREDENTIALS.password) {
        return res.sendStatus(401);
    }
    return next();
};
