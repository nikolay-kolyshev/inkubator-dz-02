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
var auth_access_token_jwt_guard_1 = require("../../common/guards/auth-access-token-jwt.guard");
var auth_refresh_token_jwt_guard_1 = require("../../common/guards/auth-refresh-token-jwt.guard");
var input_validation_middleware_1 = require("../../common/middlewares/input-validation.middleware");
var auth_controller_1 = require("./auth.controller");
var auth_validation_1 = require("./auth.validation");
var authRouter = (0, express_1.Router)();
authRouter.post.apply(authRouter, __spreadArray(__spreadArray(['/login'], auth_validation_1.authValidation.loginBody, false), [input_validation_middleware_1.inputValidationMiddleware, auth_controller_1.AuthController.login], false));
authRouter.get('/me', auth_access_token_jwt_guard_1.authAccessTokenJwtGuard, auth_controller_1.AuthController.getMe);
authRouter.post.apply(authRouter, __spreadArray(__spreadArray(['/registration'], auth_validation_1.authValidation.registrationBody, false), [input_validation_middleware_1.inputValidationMiddleware,
    auth_controller_1.AuthController.registration], false));
authRouter.post.apply(authRouter, __spreadArray(__spreadArray(['/registration-confirmation'], auth_validation_1.authValidation.registrationConfirmationBody, false), [input_validation_middleware_1.inputValidationMiddleware,
    auth_controller_1.AuthController.registrationConfirmation], false));
authRouter.post.apply(authRouter, __spreadArray(__spreadArray(['/registration-email-resending'], auth_validation_1.authValidation.registrationEmailResendingBody, false), [input_validation_middleware_1.inputValidationMiddleware,
    auth_controller_1.AuthController.registrationEmailResending], false));
authRouter.post('/refresh-token', auth_refresh_token_jwt_guard_1.authRefreshTokenJwtGuard, auth_controller_1.AuthController.refreshToken);
authRouter.post('/logout', auth_refresh_token_jwt_guard_1.authRefreshTokenJwtGuard, auth_controller_1.AuthController.logout);
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map