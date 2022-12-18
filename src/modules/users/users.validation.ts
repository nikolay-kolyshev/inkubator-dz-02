import { body, query } from 'express-validator';
import { UsersQueryRepository } from './users.query-repository';

export const usersValidation = {
    inputBody: [
        body('password')
            .exists()
            .withMessage('password должен находиться в теле запроса')
            .isString()
            .withMessage('password должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('password не может быть пустым')
            .isLength({ min: 6, max: 10 })
            .withMessage('password должен быть от 6 до 20 символов'),
        body('login')
            .exists()
            .withMessage('login должен находиться в теле запроса')
            .isString()
            .withMessage('login должен быть строкой')
            .notEmpty()
            .withMessage('login не может быть пустым')
            .trim()
            .isLength({ min: 3, max: 10 })
            .withMessage('login должен быть от 3 до 10 символов')
            .matches('^[a-zA-Z0-9_-]*$')
            .withMessage(
                'login может содержать только буквы латинские буквы, а также цифры, знак тире и знак нижнего подчеркивания',
            )
            .custom(async (login) => {
                const foundedUser = await UsersQueryRepository.findUserByLoginOrEmail(login);
                if (foundedUser) {
                    throw new Error('Юзер с таким login уже зарегестрирован в системе');
                }
                return true;
            }),
        body('email')
            .exists()
            .withMessage('email должен находиться в теле запроса')
            .isString()
            .withMessage('email должен быть строкой')
            .notEmpty()
            .withMessage('email не может быть пустым')
            .trim()
            .isLength({ min: 1 })
            .withMessage('email должен иметь длину не менее 1 символа')
            .isEmail()
            .withMessage('email введен некорректно')
            .custom(async (email) => {
                const foundedUser = await UsersQueryRepository.findUserByLoginOrEmail(email);
                if (foundedUser) {
                    throw new Error('Юзер с таким email уже зарегестрирован в системе');
                }
                return true;
            }),
    ],
    pagination: [
        query('pageNumber').toInt().default(1),
        query('pageSize').toInt().default(10),
        query('sortBy').default('createdAt'),
    ],
};
