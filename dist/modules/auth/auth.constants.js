"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_COOKIE_NAME = exports.BASIC_AUTH_CREDENTIALS = exports.AuthType = void 0;
var AuthType;
(function (AuthType) {
    AuthType["Basic"] = "basic";
    AuthType["Bearer"] = "bearer";
    AuthType["OAuth"] = "oauth";
})(AuthType = exports.AuthType || (exports.AuthType = {}));
exports.BASIC_AUTH_CREDENTIALS = {
    username: 'admin',
    password: 'qwerty',
};
exports.REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
//# sourceMappingURL=auth.constants.js.map