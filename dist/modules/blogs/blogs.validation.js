"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsValidation = void 0;
var express_validator_1 = require("express-validator");
exports.blogsValidation = {
    inputBody: [
        (0, express_validator_1.body)('name').exists().notEmpty().isString().trim().isLength({ min: 1, max: 15 }),
        (0, express_validator_1.body)('description').exists().notEmpty().isString().trim().isLength({ min: 1, max: 500 }),
        (0, express_validator_1.body)('websiteUrl').exists().notEmpty().isString().trim().isLength({ min: 1, max: 100 }).isURL(),
    ],
    update: [(0, express_validator_1.param)('id').exists().notEmpty().isString().isLength({ min: 1 }).isUUID()],
};
//# sourceMappingURL=blogs.validation.js.map