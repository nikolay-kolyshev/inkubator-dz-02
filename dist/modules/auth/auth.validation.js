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
};
//# sourceMappingURL=auth.validation.js.map