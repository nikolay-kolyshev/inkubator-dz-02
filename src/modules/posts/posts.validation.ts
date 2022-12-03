import { body, param } from 'express-validator';
import { BlogsRepository } from '../blogs/blogs.repository';

export const postsValidation = {
    inputBody: [
        body('title')
            .exists()
            .withMessage('title обязательное поле')
            .notEmpty()
            .withMessage('title не может быть пустым')
            .isString()
            .withMessage('title должен быть строкой')
            .trim()
            .isLength({ min: 1, max: 300 })
            .withMessage('title должен быть от 1 до 300 символов'),
        body('shortDescription')
            .exists()
            .withMessage('shortDescription обязательное поле')
            .notEmpty()
            .withMessage('shortDescription не может быть пустым')
            .isString()
            .withMessage('shortDescription должен быть строкой')
            .trim()
            .isLength({ min: 1, max: 100 }),
        body('content').exists().notEmpty().isString().trim().isLength({ min: 1, max: 1000 }),
        body('blogId')
            .exists()
            .withMessage('blogId обязательное поле')
            .notEmpty()
            .withMessage('blogId не может быть пустым')
            .isString()
            .withMessage('blogId должен быть строкой')
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
