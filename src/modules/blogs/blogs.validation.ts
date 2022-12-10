import { body, param, query } from 'express-validator';

export const blogsValidation = {
    inputBody: [
        body('name')
            .exists()
            .withMessage('name должен находиться в теле запроса')
            .isString()
            .withMessage('name должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('name не может быть пустым')
            .isLength({ min: 1, max: 15 })
            .withMessage('nameeyo должен быть от 1 до 15 символов'),
        body('description')
            .exists()
            .withMessage('description должен находиться в теле запроса')
            .isString()
            .withMessage('description должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('description не может быть пустым')
            .isLength({ min: 1, max: 500 })
            .withMessage('description должен быть от 1 до 500 символов'),
        body('websiteUrl')
            .exists()
            .withMessage('websiteUrlпопр должен находиться в теле запроса')
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
    pagination: [
        query('pageNumber').toInt().isInt({ min: 1 }).default(1),
        query('pageSize').toInt().isInt({ min: 1 }).default(10),
        query('sortBy').default('createdAt'),
    ],
    update: [param('id').exists().notEmpty().isString().isLength({ min: 1 }).isUUID()],
    newPost: [
        body('title')
            .exists()
            .withMessage('title должен находиться в теле запроса')
            .isString()
            .withMessage('title должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('title не может быть пустым')
            .isLength({ min: 1, max: 30 })
            .withMessage('title должен быть от 1 до 30 символов'),
        body('shortDescription')
            .exists()
            .withMessage('title должен находиться в теле запроса')
            .isString()
            .withMessage('shortDescription должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('shortDescription не может быть пустым')
            .isLength({ min: 1, max: 100 })
            .withMessage('shortDescription должен быть от 1 до 100 символов'),
        body('content')
            .exists()
            .withMessage('content должен находиться в теле запроса')
            .isString()
            .withMessage('content должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('content не может быть пустым')
            .isLength({ min: 1, max: 1000 })
            .withMessage('content должен быть от 1 до 1000 символов'),
    ],
};
