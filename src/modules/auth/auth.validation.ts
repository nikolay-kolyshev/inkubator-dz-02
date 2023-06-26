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
            .withMessage('login должен содержать либо буквы латинского алфавита, либо цифры, либо символы - и _'),
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
            .withMessage('email должен быть валидным'),
    ],
    registrationConfirmationBody: [
        body('code')
            .exists()
            .withMessage('code должен быть передан')
            .notEmpty()
            .withMessage('code не должен быть пустым'),
    ],
    registrationEmailResendingBody: [
        body('email')
            .exists()
            .withMessage('email должен быть передан')
            .notEmpty()
            .withMessage('email не должен быть пустым')
            .isEmail()
            .withMessage('email должен быть валидным'),
    ],
};
