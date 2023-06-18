import { NextFunction, Request, Response } from 'express';
import { JwtService } from '../../application/jwt/jwt.service';
import { STATUS_CODES } from '../constants';

export const authJwtGuard = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers?.authorization) {
        res.send(STATUS_CODES.UNAUTHORIZED);
        return;
    }

    const [, token] = req.headers.authorization.split(' ');

    const userId = await JwtService.getUserIdFromJwt(token);
    if (userId) {
        req.userId = userId.toString();
        next();
    }
    res.send(STATUS_CODES.UNAUTHORIZED);
    return;
};
