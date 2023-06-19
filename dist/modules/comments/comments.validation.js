"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsValidation = void 0;
var express_validator_1 = require("express-validator");
exports.commentsValidation = {
    inputBody: [
        (0, express_validator_1.body)('content')
            .exists()
            .withMessage('content должен находиться в теле запроса')
            .isString()
            .withMessage('content должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('content не может быть пустым')
            .isLength({ min: 20, max: 300 })
            .withMessage('content должен быть от 20 до 300 символов'),
    ],
};
//# sourceMappingURL=comments.validation.js.map