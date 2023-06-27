import { NextFunction, Request, Response } from 'express';
import { JwtService } from '../../application/jwt/jwt.service';
import { REFRESH_TOKEN_COOKIE_NAME } from '../../modules/auth/auth.constants';
import { AuthRepository } from '../../modules/auth/auth.repository';
import { STATUS_CODES } from '../constants';

export const authRefreshTokenJwtGuard = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

    if (!token) {
        res.sendStatus(STATUS_CODES.UNAUTHORIZED);
        return;
    }

    const userId = await JwtService.getUserIdFromJwt(token);

    if (!userId) {
        res.sendStatus(STATUS_CODES.UNAUTHORIZED);
        return;
    }

    const isBannedToken = await AuthRepository.checkIsRefreshTokenBanned(token);

    if (isBannedToken) {
        res.sendStatus(STATUS_CODES.UNAUTHORIZED);
        return;
    }

    req.userId = userId.toString();
    next();
    return;
};
