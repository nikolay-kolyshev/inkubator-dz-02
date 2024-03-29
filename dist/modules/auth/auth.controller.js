"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var jwt_service_1 = require("../../application/jwt/jwt.service");
var constants_1 = require("../../common/constants");
var users_query_repository_1 = require("../users/users.query-repository");
var users_service_1 = require("../users/users.service");
var auth_service_1 = require("./auth.service");
var auth_constants_1 = require("./auth.constants");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    /**
     * @description method POST
     */
    AuthController.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, loginOrEmail, password, user, accessToken, refreshToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, loginOrEmail = _a.loginOrEmail, password = _a.password;
                        return [4 /*yield*/, users_service_1.UsersService.checkCredentials({ loginOrEmail: loginOrEmail, password: password })];
                    case 1:
                        user = _b.sent();
                        if (user === null) {
                            res.sendStatus(constants_1.STATUS_CODES.UNAUTHORIZED);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, jwt_service_1.JwtService.createAccessJwtToken(user)];
                    case 2:
                        accessToken = _b.sent();
                        return [4 /*yield*/, jwt_service_1.JwtService.createRefreshJwtToken(user)];
                    case 3:
                        refreshToken = _b.sent();
                        res.cookie(auth_constants_1.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
                            httpOnly: true,
                            secure: true,
                        });
                        res.status(constants_1.STATUS_CODES.OK).send({
                            accessToken: accessToken,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description method GET
     */
    AuthController.getMe = function (req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        userId = req.userId.toString();
                        return [4 /*yield*/, users_service_1.UsersService.getById(userId)];
                    case 1:
                        user = _d.sent();
                        if (!user) {
                            res.sendStatus(constants_1.STATUS_CODES.UNAUTHORIZED);
                        }
                        res.status(constants_1.STATUS_CODES.OK).json({
                            email: (_a = user === null || user === void 0 ? void 0 : user.email) !== null && _a !== void 0 ? _a : '',
                            login: (_b = user === null || user === void 0 ? void 0 : user.login) !== null && _b !== void 0 ? _b : '',
                            userId: (_c = user === null || user === void 0 ? void 0 : user.id) !== null && _c !== void 0 ? _c : '',
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description method POST
     */
    AuthController.registration = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userCreationResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, auth_service_1.AuthService.registration(req.body)];
                    case 1:
                        userCreationResult = _a.sent();
                        if (userCreationResult === null) {
                            res.sendStatus(constants_1.STATUS_CODES.BAD_REQUEST);
                            return [2 /*return*/];
                        }
                        res.sendStatus(constants_1.STATUS_CODES.NO_CONTENT);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description method POST
     */
    AuthController.registrationConfirmation = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var emailConfirmationResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, auth_service_1.AuthService.registrationConfirmation(req.body.code)];
                    case 1:
                        emailConfirmationResult = _a.sent();
                        if (emailConfirmationResult === null) {
                            res.sendStatus(constants_1.STATUS_CODES.BAD_REQUEST);
                            return [2 /*return*/];
                        }
                        res.sendStatus(constants_1.STATUS_CODES.NO_CONTENT);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description method POST
     */
    AuthController.registrationEmailResending = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var emailResendingResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, auth_service_1.AuthService.registrationEmailResending(req.body.email)];
                    case 1:
                        emailResendingResult = _a.sent();
                        if (emailResendingResult === null) {
                            res.sendStatus(constants_1.STATUS_CODES.BAD_REQUEST);
                            return [2 /*return*/];
                        }
                        res.sendStatus(constants_1.STATUS_CODES.NO_CONTENT);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description method POST
     */
    AuthController.refreshToken = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, resOperation, user, accessToken, refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = req.cookies[auth_constants_1.REFRESH_TOKEN_COOKIE_NAME];
                        return [4 /*yield*/, auth_service_1.AuthService.addRefreshTokenToBannedJwtTokens(token)];
                    case 1:
                        resOperation = _a.sent();
                        if (!resOperation) {
                            res.sendStatus(constants_1.STATUS_CODES.BAD_REQUEST);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, users_query_repository_1.UsersQueryRepository.findUserEntityById(req.userId)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            res.sendStatus(constants_1.STATUS_CODES.BAD_REQUEST);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, jwt_service_1.JwtService.createAccessJwtToken(user)];
                    case 3:
                        accessToken = _a.sent();
                        return [4 /*yield*/, jwt_service_1.JwtService.createRefreshJwtToken(user)];
                    case 4:
                        refreshToken = _a.sent();
                        res.cookie(auth_constants_1.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
                            httpOnly: true,
                            secure: true,
                        });
                        res.status(constants_1.STATUS_CODES.OK).send({
                            accessToken: accessToken,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description method POST
     */
    AuthController.logout = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, resOperation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = req.cookies[auth_constants_1.REFRESH_TOKEN_COOKIE_NAME];
                        return [4 /*yield*/, auth_service_1.AuthService.addRefreshTokenToBannedJwtTokens(token)];
                    case 1:
                        resOperation = _a.sent();
                        if (!resOperation) {
                            res.sendStatus(constants_1.STATUS_CODES.BAD_REQUEST);
                            return [2 /*return*/];
                        }
                        res.clearCookie(auth_constants_1.REFRESH_TOKEN_COOKIE_NAME);
                        res.sendStatus(constants_1.STATUS_CODES.NO_CONTENT);
                        return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map