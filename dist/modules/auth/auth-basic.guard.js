"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authBasicGuard = void 0;
var constants_1 = require("../../common/constants");
var auth_constants_1 = require("./auth.constants");
var authBasicGuard = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(constants_1.STATUS_CODES.UNAUTHORIZED);
    }
    var _a = authHeader.split(' '), type = _a[0], token = _a[1];
    if (type.toLowerCase() !== auth_constants_1.AuthType.Basic) {
        return res.sendStatus(constants_1.STATUS_CODES.UNAUTHORIZED);
    }
    var decodedToken = Buffer.from(token, 'base64').toString('utf-8');
    var _b = decodedToken.split(':'), username = _b[0], password = _b[1];
    if (username !== auth_constants_1.BASIC_AUTH_CREDENTIALS.username || password !== auth_constants_1.BASIC_AUTH_CREDENTIALS.password) {
        return res.sendStatus(constants_1.STATUS_CODES.UNAUTHORIZED);
    }
    return next();
};
exports.authBasicGuard = authBasicGuard;
//# sourceMappingURL=auth-basic.guard.js.map