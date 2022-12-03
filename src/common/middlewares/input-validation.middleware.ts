import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { STATUS_CODES } from '../constants';

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const errorFormatter = ({ msg, param }: ValidationError) => {
        return {
            message: msg,
            field: param,
        };
    };
    if (!errors.isEmpty()) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            errorsMessages: errors.array({ onlyFirstError: true }).map(errorFormatter),
        });
    }
    return next();
};
