import { body } from 'express-validator';
import { UsersQueryRepository } from '../users/users.query-repository';

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
    registrationBody: [
        body('login')
            .exists()
            .withMessage('login должен быть передан')
            .notEmpty()
            .withMessage('login не должен быть пустым')
            .isLength({
                min: 3,
                max: 10,
            })
            .withMessage('login должен быть от 3 до 10 символов')
            .matches(/^[a-zA-Z0-9_-]*$/)
            .withMessage('login должен содержать либо буквы латинского алфавита, либо цифры, либо символы - и _')
            .custom(async (login) => {
                const foundUser = await UsersQueryRepository.findUserSchemaByLogin(login);
                if (foundUser) {
                    throw new Error();
                }
            })
            .withMessage('пользователь с таким login уже существует!'),
        body('password')
            .exists()
            .withMessage('password должен быть передан')
            .notEmpty()
            .withMessage('password не должен быть пустым')
            .isLength({
                min: 6,
                max: 20,
            })
            .withMessage('password должен быть от 6 до 20 символов'),
        body('email')
            .exists()
            .withMessage('email должен быть передан')
            .notEmpty()
            .withMessage('email не должен быть пустым')
            .isEmail()
            .withMessage('email должен быть валидным')
            .custom(async (email) => {
                const foundUser = await UsersQueryRepository.findUserSchemaByEmail(email);
                if (foundUser) {
                    throw new Error();
                }
            })
            .withMessage('пользователь с таким email уже существует!'),
    ],
    registrationConfirmationBody: [
        body('code')
            .exists()
            .withMessage('code должен быть передан')
            .notEmpty()
            .withMessage('code не должен быть пустым')
            .custom(async (code) => {
                const isEmailConfirmed = await UsersQueryRepository.checkUserEmailConfirmationByEmail(code);
                if (isEmailConfirmed) {
                    throw new Error();
                }
            })
            .withMessage('Пользователь с этим email уже подтвердил свой аккаунт')
            .custom(async (code) => {
                const foundUser = await UsersQueryRepository.findUserSchemaByConfirmationCode(code);
                if (!foundUser) {
                    throw new Error();
                }
            })
            .withMessage('Пользователя с таким кодом подтверждения email не существует'),
    ],
    registrationEmailResendingBody: [
        body('email')
            .exists()
            .withMessage('email должен быть передан')
            .notEmpty()
            .withMessage('email не должен быть пустым')
            .isEmail()
            .withMessage('email должен быть валидным')
            .custom(async (email) => {
                const foundUser = await UsersQueryRepository.findUserSchemaByEmail(email);
                if (!foundUser) {
                    throw new Error();
                }
            })
            .withMessage('Пользователь с этим email не существует')
            .custom(async (email) => {
                const isEmailConfirmed = await UsersQueryRepository.checkUserEmailConfirmationByEmail(email);
                if (isEmailConfirmed) {
                    throw new Error();
                }
            })
            .withMessage('Пользователь с этим email уже подтвердил свой аккаунт'),
    ],
};
