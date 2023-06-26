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
exports.authValidation = void 0;
var express_validator_1 = require("express-validator");
var users_query_repository_1 = require("../users/users.query-repository");
exports.authValidation = {
    loginBody: [
        (0, express_validator_1.body)('loginOrEmail')
            .exists()
            .withMessage('loginOrEmail должен быть передан')
            .notEmpty()
            .withMessage('loginOrEmail не должен быть пустым'),
        (0, express_validator_1.body)('password')
            .exists()
            .withMessage('password должен быть передан')
            .notEmpty()
            .withMessage('password не должен быть пустым'),
    ],
    registrationBody: [
        (0, express_validator_1.body)('login')
            .exists()
            .withMessage('login должен быть передан')
            .notEmpty()
            .withMessage('login не должен быть пустым')
            .isLength({
            min: 3,
            max: 10,
        })
            .withMessage('login должен быть от 3 до 10 символов')
            .matches(/^[a-zA-Z0-9_-]*$/)
            .withMessage('login должен содержать либо буквы латинского алфавита, либо цифры, либо символы - и _')
            .custom(function (login) { return __awaiter(void 0, void 0, void 0, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, users_query_repository_1.UsersQueryRepository.findUserSchemaByLogin(login)];
                    case 1:
                        foundUser = _a.sent();
                        if (foundUser) {
                            throw new Error();
                        }
                        return [2 /*return*/];
                }
            });
        }); })
            .withMessage('пользователь с таким login уже существует!'),
        (0, express_validator_1.body)('password')
            .exists()
            .withMessage('password должен быть передан')
            .notEmpty()
            .withMessage('password не должен быть пустым')
            .isLength({
            min: 6,
            max: 20,
        })
            .withMessage('password должен быть от 6 до 20 символов'),
        (0, express_validator_1.body)('email')
            .exists()
            .withMessage('email должен быть передан')
            .notEmpty()
            .withMessage('email не должен быть пустым')
            .isEmail()
            .withMessage('email должен быть валидным')
            .custom(function (email) { return __awaiter(void 0, void 0, void 0, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, users_query_repository_1.UsersQueryRepository.findUserSchemaByEmail(email)];
                    case 1:
                        foundUser = _a.sent();
                        if (foundUser) {
                            throw new Error();
                        }
                        return [2 /*return*/];
                }
            });
        }); })
            .withMessage('пользователь с таким email уже существует!'),
    ],
    registrationConfirmationBody: [
        (0, express_validator_1.body)('code')
            .exists()
            .withMessage('code должен быть передан')
            .notEmpty()
            .withMessage('code не должен быть пустым'),
    ],
    registrationEmailResendingBody: [
        (0, express_validator_1.body)('email')
            .exists()
            .withMessage('email должен быть передан')
            .notEmpty()
            .withMessage('email не должен быть пустым')
            .isEmail()
            .withMessage('email должен быть валидным')
            .custom(function (email) { return __awaiter(void 0, void 0, void 0, function () {
            var isEmailConfirmed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, users_query_repository_1.UsersQueryRepository.checkUserEmailConfirmationByEmail(email)];
                    case 1:
                        isEmailConfirmed = _a.sent();
                        if (isEmailConfirmed) {
                            throw new Error();
                        }
                        return [2 /*return*/];
                }
            });
        }); })
            .withMessage('Пользователь с этим email уже подтвердил свой аккаунт'),
    ],
};
//# sourceMappingURL=auth.validation.js.map