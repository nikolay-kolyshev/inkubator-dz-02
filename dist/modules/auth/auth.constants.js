"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASIC_AUTH_CREDENTIALS = exports.AuthType = void 0;
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
//# sourceMappingURL=auth.constants.js.map