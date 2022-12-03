import { body, param } from 'express-validator';

export const blogsValidation = {
    inputBody: [
        body('name').exists().notEmpty().isString().trim().isLength({ min: 1, max: 15 }),
        body('description').exists().notEmpty().isString().trim().isLength({ min: 1, max: 500 }),
        body('websiteUrl').exists().notEmpty().isString().trim().isLength({ min: 1, max: 100 }).isURL(),
    ],
    update: [param('id').exists().notEmpty().isString().isLength({ min: 1 }).isUUID()],
};
