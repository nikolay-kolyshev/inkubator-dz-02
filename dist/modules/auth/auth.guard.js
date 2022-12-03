"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
var auth_constants_1 = require("./auth.constants");
var authGuard = function (req, res, next) {
    console.log(req.headers.authorization);
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401);
    }
    var _a = authHeader.split(' '), type = _a[0], token = _a[1];
    if (type.toLowerCase() !== auth_constants_1.AuthType.Basic) {
        return res.sendStatus(401);
    }
    var decodedToken = Buffer.from(token, 'base64').toString('utf-8');
    var _b = decodedToken.split(':'), username = _b[0], password = _b[1];
    console.log('CREDS', username, password);
    if (username !== auth_constants_1.AUTH_CREDENTIALS.username || password !== auth_constants_1.AUTH_CREDENTIALS.password) {
        return res.sendStatus(401);
    }
    return next();
};
exports.authGuard = authGuard;
//# sourceMappingURL=auth.guard.js.map