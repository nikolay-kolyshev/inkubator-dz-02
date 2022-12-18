import { body } from 'express-validator';

export const authValidation = {
    loginBody: [
        body('loginOrEmail')
            .exists()
            .withMessage('loginOrEmail должен быть передан')
            .notEmpty()
            .withMessage('loginOrEmail не должен быть пустым'),

        body('password')
            .exists()
            .withMessage('password должен быть передан')
            .notEmpty()
            .withMessage('password не должен быть пустым'),
    ],
};
