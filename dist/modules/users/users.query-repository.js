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
exports.UsersQueryRepository = void 0;
var getCollectionItemsWithPagination_1 = require("../../common/utils/getCollectionItemsWithPagination");
var collections_1 = require("../../database/collections");
var UsersQueryRepository = /** @class */ (function () {
    function UsersQueryRepository() {
    }
    UsersQueryRepository.findUsers = function (_a) {
        var _b = _a.sortBy, sortBy = _b === void 0 ? 'createdAt' : _b, _c = _a.sortDirection, sortDirection = _c === void 0 ? 'esc' : _c, _d = _a.pageSize, pageSize = _d === void 0 ? 10 : _d, _e = _a.pageNumber, pageNumber = _e === void 0 ? 1 : _e, searchLoginTerm = _a.searchLoginTerm, searchEmailTerm = _a.searchEmailTerm;
        return __awaiter(this, void 0, void 0, function () {
            var filter, usersSchemes, items, totalCount, pagesCount;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        filter = {};
                        if (searchLoginTerm && searchEmailTerm) {
                            filter.$or = [
                                { login: { $regex: searchLoginTerm, $options: 'i' } },
                                { email: { $regex: searchEmailTerm, $options: 'i' } },
                            ];
                        }
                        else if (searchLoginTerm) {
                            filter.login = { $regex: searchLoginTerm };
                        }
                        else if (searchEmailTerm) {
                            filter.email = { $regex: searchEmailTerm };
                        }
                        return [4 /*yield*/, (0, getCollectionItemsWithPagination_1.getCollectionItemsWithPagination)(collections_1.usersCollection, {
                                filter: filter,
                                sortBy: sortBy,
                                sortDirection: sortDirection,
                                pageSize: pageSize,
                                pageNumber: pageNumber,
                            })];
                    case 1:
                        usersSchemes = _f.sent();
                        items = [];
                        if (Boolean(usersSchemes) && usersSchemes.length) {
                            items = usersSchemes.map(function (item) { return ({
                                id: item.id,
                                login: item.login,
                                email: item.email,
                                createdAt: item.createdAt,
                            }); });
                        }
                        return [4 /*yield*/, collections_1.usersCollection.count(filter)];
                    case 2:
                        totalCount = _f.sent();
                        pagesCount = Math.ceil(totalCount / pageSize);
                        return [2 /*return*/, {
                                pagesCount: pagesCount,
                                page: pageNumber,
                                pageSize: pageSize,
                                totalCount: totalCount,
                                items: items,
                            }];
                }
            });
        });
    };
    UsersQueryRepository.findUserSchemaByLoginOrEmail = function (loginOrEmail) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collections_1.usersCollection.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersQueryRepository.findUserEntityByLoginOrEmail = function (loginOrEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UsersQueryRepository.findUserSchemaByLoginOrEmail(loginOrEmail)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                id: user.id,
                                login: user.login,
                                email: user.email,
                                createdAt: user.createdAt,
                            }];
                }
            });
        });
    };
    UsersQueryRepository.findUserSchemaById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collections_1.usersCollection.findOne({ id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersQueryRepository.findUserSchemaByLogin = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collections_1.usersCollection.findOne({ login: login })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersQueryRepository.findUserSchemaByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collections_1.usersCollection.findOne({ email: email })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersQueryRepository.checkUserEmailConfirmationByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collections_1.usersCollection.findOne({ email: email, isEmailConfirmed: true })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, Boolean(user)];
                }
            });
        });
    };
    UsersQueryRepository.findUserEntityById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UsersQueryRepository.findUserSchemaById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                id: user.id,
                                login: user.login,
                                email: user.email,
                                createdAt: user.createdAt,
                            }];
                }
            });
        });
    };
    return UsersQueryRepository;
}());
exports.UsersQueryRepository = UsersQueryRepository;
//# sourceMappingURL=users.query-repository.js.map