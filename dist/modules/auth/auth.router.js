"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Auth router */
var express_1 = require("express");
var auth_jwt_guard_1 = require("../../common/guards/auth-jwt.guard");
var input_validation_middleware_1 = require("../../common/middlewares/input-validation.middleware");
var auth_controller_1 = require("./auth.controller");
var auth_validation_1 = require("./auth.validation");
var authRouter = (0, express_1.Router)();
authRouter.post.apply(authRouter, __spreadArray(__spreadArray(['/login'], auth_validation_1.authValidation.loginBody, false), [input_validation_middleware_1.inputValidationMiddleware, auth_controller_1.AuthController.postLogin], false));
authRouter.get('/me', auth_jwt_guard_1.authJwtGuard, auth_controller_1.AuthController.getMe);
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map