import { body, param } from 'express-validator';

export const blogsValidation = {
    inputBody: [
        body('name')
            .isString()
            .withMessage('name должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('name не может быть пустым')
            .isLength({ min: 1, max: 15 })
            .withMessage('name должен быть от 1 до 15 символов'),
        body('description')
            .isString()
            .withMessage('description должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('description не может быть пустым')
            .isLength({ min: 1, max: 500 })
            .withMessage('description должен быть от 1 до 500 символов'),
        body('websiteUrl')
            .isString()
            .withMessage('websiteUrl должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('websiteUrl не может быть пустым')
            .isLength({ min: 1, max: 100 })
            .withMessage('websiteUrl должен быть от 1 до 100 символов')
            .isURL()
            .withMessage('websiteUrl должен быть URL'),
    ],
    update: [param('id').exists().notEmpty().isString().isLength({ min: 1 }).isUUID()],
};
