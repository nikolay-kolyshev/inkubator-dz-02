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
exports.UsersService = void 0;
var generateDate_1 = require("../../common/utils/generateDate");
var generateId_1 = require("../../common/utils/generateId");
var HashingUtils_1 = require("../../common/utils/HashingUtils");
var users_query_repository_1 = require("./users.query-repository");
var users_repository_1 = require("./users.repository");
var UsersService = /** @class */ (function () {
    function UsersService() {
    }
    UsersService.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, users_query_repository_1.UsersQueryRepository.findUserSchemaById(id)];
                    case 1:
                        foundedUser = _a.sent();
                        if (!foundedUser) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, foundedUser];
                }
            });
        });
    };
    UsersService.checkCredentials = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var foundedUser, generatePasswordHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, users_query_repository_1.UsersQueryRepository.findUserSchemaByLoginOrEmail(dto.loginOrEmail)];
                    case 1:
                        foundedUser = _a.sent();
                        if (!foundedUser) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, HashingUtils_1.HashingUtils.generateHash(dto.password, foundedUser.passwordSalt)];
                    case 2:
                        generatePasswordHash = _a.sent();
                        return [2 /*return*/, generatePasswordHash === foundedUser.passwordHash ? foundedUser : null];
                }
            });
        });
    };
    /**
     * @return {string} userId
     */
    UsersService.create = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var id, createdAt, emailConfirmationCode, passwordSalt, passwordHash, userCreationResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (0, generateId_1.generateId)();
                        createdAt = (0, generateDate_1.generateDate)();
                        emailConfirmationCode = (0, generateId_1.generateId)();
                        return [4 /*yield*/, HashingUtils_1.HashingUtils.generateSalt()];
                    case 1:
                        passwordSalt = _a.sent();
                        return [4 /*yield*/, HashingUtils_1.HashingUtils.generateHash(dto.password, passwordSalt)];
                    case 2:
                        passwordHash = _a.sent();
                        return [4 /*yield*/, users_repository_1.UsersRepository.createUser({
                                id: id,
                                email: dto.email,
                                login: dto.login,
                                createdAt: createdAt,
                                passwordHash: passwordHash,
                                passwordSalt: passwordSalt,
                                isEmailConfirmed: false,
                                emailConfirmationCode: emailConfirmationCode,
                            })];
                    case 3:
                        userCreationResult = _a.sent();
                        if (!userCreationResult) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, id];
                }
            });
        });
    };
    UsersService.confirmUserEmailByUserId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, users_repository_1.UsersRepository.confirmUserEmailByUserId(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, users_repository_1.UsersRepository.deleteUserById(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map