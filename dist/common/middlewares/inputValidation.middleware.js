"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
var express_validator_1 = require("express-validator");
var constants_1 = require("../constants");
var inputValidationMiddleware = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(constants_1.STATUS_CODES.BAD_REQUEST).json({ errors: errors.array() });
    }
    return next();
};
exports.inputValidationMiddleware = inputValidationMiddleware;
//# sourceMappingURL=inputValidation.middleware.js.map