"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
var express_validator_1 = require("express-validator");
exports.authValidation = {
    loginBody: [
        (0, express_validator_1.body)('loginOrEmail')
            .exists()
            .withMessage('loginOrEmail должен быть передан')
            .notEmpty()
            .withMessage('loginOrEmail не должен быть пустым'),
        (0, express_validator_1.body)('password')
            .exists()
            .withMessage('password должен быть передан')
            .notEmpty()
            .withMessage('password не должен быть пустым'),
    ],
    registrationBody: [
        (0, express_validator_1.body)('login')
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
        (0, express_validator_1.body)('password')
            .exists()
            .withMessage('password должен быть передан')
            .notEmpty()
            .withMessage('password не должен быть пустым')
            .isLength({
            min: 6,
            max: 20,
        })
            .withMessage('password должен быть от 6 до 20 символов'),
        (0, express_validator_1.body)('email')
            .exists()
            .withMessage('email должен быть передан')
            .notEmpty()
            .withMessage('email не должен быть пустым')
            .isEmail()
            .withMessage('email должен быть валидным'),
    ],
    registrationConfirmationBody: [
        (0, express_validator_1.body)('code')
            .exists()
            .withMessage('code должен быть передан')
            .notEmpty()
            .withMessage('code не должен быть пустым'),
    ],
    registrationEmailResendingBody: [
        (0, express_validator_1.body)('email')
            .exists()
            .withMessage('email должен быть передан')
            .notEmpty()
            .withMessage('email не должен быть пустым')
            .isEmail()
            .withMessage('email должен быть валидным'),
    ],
};
//# sourceMappingURL=auth.validation.js.map