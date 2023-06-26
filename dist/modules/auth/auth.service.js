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
exports.AuthService = void 0;
var generateId_1 = require("../../common/utils/generateId");
var mail_manager_1 = require("../../managers/mail.manager");
var users_query_repository_1 = require("../users/users.query-repository");
var users_repository_1 = require("../users/users.repository");
var users_service_1 = require("../users/users.service");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.registration = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, foundUser, emailSendingResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, users_service_1.UsersService.create({
                            login: dto.login,
                            email: dto.email,
                            password: dto.password,
                        })];
                    case 1:
                        userId = _a.sent();
                        if (!userId) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, users_query_repository_1.UsersQueryRepository.findUserSchemaById(userId)];
                    case 2:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, mail_manager_1.MailManager.sendRegistrationConfirmationMessage(dto.email, foundUser.emailConfirmationCode)];
                    case 3:
                        emailSendingResult = _a.sent();
                        if (!(emailSendingResult === null)) return [3 /*break*/, 5];
                        return [4 /*yield*/, users_service_1.UsersService.deleteById(userId)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/, true];
                }
            });
        });
    };
    AuthService.registrationConfirmation = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser, userEmailConfirmationResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, users_query_repository_1.UsersQueryRepository.findUserSchemaByConfirmationCode(code)];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            return [2 /*return*/, null];
                        }
                        if (foundUser.emailConfirmationCode !== code) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, users_service_1.UsersService.confirmUserEmailByUserId(foundUser.id)];
                    case 2:
                        userEmailConfirmationResult = _a.sent();
                        if (userEmailConfirmationResult === null) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    AuthService.registrationEmailResending = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser, newCode, updateUserConfirmationCodeResult, emailSendingResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, users_query_repository_1.UsersQueryRepository.findUserSchemaByEmail(email)];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            return [2 /*return*/, null];
                        }
                        newCode = (0, generateId_1.generateId)();
                        return [4 /*yield*/, users_repository_1.UsersRepository.updateUserConfirmationCodeByUserId(newCode, foundUser.id)];
                    case 2:
                        updateUserConfirmationCodeResult = _a.sent();
                        if (!updateUserConfirmationCodeResult) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, mail_manager_1.MailManager.sendRegistrationConfirmationMessage(email, newCode)];
                    case 3:
                        emailSendingResult = _a.sent();
                        if (emailSendingResult === null) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map