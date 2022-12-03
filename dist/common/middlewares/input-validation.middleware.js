"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
var express_validator_1 = require("express-validator");
var constants_1 = require("../constants");
var inputValidationMiddleware = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    var errorFormatter = function (_a) {
        var msg = _a.msg, param = _a.param;
        return {
            message: msg,
            field: param,
        };
    };
    if (!errors.isEmpty()) {
        return res.status(constants_1.STATUS_CODES.BAD_REQUEST).json({
            errors: errors.array({ onlyFirstError: true }).map(errorFormatter),
        });
    }
    return next();
};
exports.inputValidationMiddleware = inputValidationMiddleware;
//# sourceMappingURL=input-validation.middleware.js.map