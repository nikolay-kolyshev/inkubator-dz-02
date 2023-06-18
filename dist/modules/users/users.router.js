"use strict";
/* Users router */
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
var express_1 = require("express");
var input_validation_middleware_1 = require("../../common/middlewares/input-validation.middleware");
var auth_basic_guard_1 = require("../../common/guards/auth-basic.guard");
var users_controller_1 = require("./users.controller");
var users_validation_1 = require("./users.validation");
var usersRouter = (0, express_1.Router)();
usersRouter.get.apply(usersRouter, __spreadArray(__spreadArray(['/',
    auth_basic_guard_1.authBasicGuard], users_validation_1.usersValidation.pagination, false), [input_validation_middleware_1.inputValidationMiddleware,
    users_controller_1.UsersController.getUsers], false));
usersRouter.post.apply(usersRouter, __spreadArray(__spreadArray(['/',
    auth_basic_guard_1.authBasicGuard], users_validation_1.usersValidation.inputBody, false), [input_validation_middleware_1.inputValidationMiddleware,
    users_controller_1.UsersController.postUser], false));
usersRouter.delete('/:id', auth_basic_guard_1.authBasicGuard, users_controller_1.UsersController.deleteUserById);
exports.default = usersRouter;
//# sourceMappingURL=users.router.js.map