import { body, param } from 'express-validator';
import { BlogsRepository } from '../blogs/blogs.repository';

export const postsValidation = {
    inputBody: [
        body('title')
            .isString()
            .withMessage('title должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('title не может быть пустым')
            .isLength({ min: 1, max: 30 })
            .withMessage('title должен быть от 1 до 30 символов'),
        body('shortDescription')
            .isString()
            .withMessage('shortDescription должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('shortDescription не может быть пустым')
            .isLength({ min: 1, max: 300 })
            .withMessage('shortDescription должен быть от 1 до 300 символов'),
        body('content')
            .isString()
            .withMessage('content должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('content не может быть пустым')
            .isLength({ min: 1, max: 1000 })
            .withMessage('shortDescription должен быть от 1 до 1000 символов'),
        body('blogId')
            .isString()
            .withMessage('blogId должен быть строкой')
            .notEmpty()
            .withMessage('blogId не может быть пустым')
            .trim()
            .isLength({ min: 1 })
            .withMessage('blogId должен иметь длину не менее 1 символа')
            .isUUID()
            .withMessage('blogId должен быть UUID')
            .custom(async (id) => {
                const foundedBlog = await BlogsRepository.findBlogById(id);
                if (!foundedBlog) {
                    throw new Error('Блог с таким blogId не найден. Пожалуйста, проверьте blogId');
                }
                return true;
            }),
    ],
    update: [param('id').exists().notEmpty().isString().isLength({ min: 1 }).isUUID()],
};
