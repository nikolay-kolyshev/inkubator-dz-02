import { body } from 'express-validator';

export const commentsValidation = {
    inputBody: [
        body('content')
            .exists()
            .withMessage('content должен находиться в теле запроса')
            .isString()
            .withMessage('content должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('content не может быть пустым')
            .isLength({ min: 20, max: 300 })
            .withMessage('content должен быть от 20 до 300 символов'),
    ],
};
