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
exports.CommentsQueryRepository = void 0;
var getCollectionItemsWithPagination_1 = require("../../common/utils/getCollectionItemsWithPagination");
var collections_1 = require("../../database/collections");
var CommentsQueryRepository = /** @class */ (function () {
    function CommentsQueryRepository() {
    }
    CommentsQueryRepository.findAllComments = function (_a) {
        var _b = _a.sortBy, sortBy = _b === void 0 ? 'createdAt' : _b, _c = _a.sortDirection, sortDirection = _c === void 0 ? 'esc' : _c, _d = _a.pageSize, pageSize = _d === void 0 ? 10 : _d, _e = _a.pageNumber, pageNumber = _e === void 0 ? 1 : _e, postId = _a.postId;
        return __awaiter(this, void 0, void 0, function () {
            var filter, items, mappedItems, totalCount, pagesCount;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        filter = {};
                        if (postId) {
                            filter.postId = { $regex: postId };
                        }
                        return [4 /*yield*/, (0, getCollectionItemsWithPagination_1.getCollectionItemsWithPagination)(collections_1.commentsCollection, {
                                filter: filter,
                                sortBy: sortBy,
                                sortDirection: sortDirection,
                                pageSize: pageSize,
                                pageNumber: pageNumber,
                            })];
                    case 1:
                        items = _f.sent();
                        mappedItems = items.map(function (item) { return ({
                            id: item.id,
                            content: item.content,
                            commentatorInfo: {
                                userId: item.commentator.id,
                                userLogin: item.commentator.login,
                            },
                            createdAt: item.createdAt,
                        }); });
                        return [4 /*yield*/, collections_1.commentsCollection.count(filter)];
                    case 2:
                        totalCount = _f.sent();
                        pagesCount = Math.ceil(totalCount / pageSize);
                        return [2 /*return*/, {
                                pagesCount: pagesCount,
                                page: pageNumber,
                                pageSize: pageSize,
                                totalCount: totalCount,
                                items: mappedItems,
                            }];
                }
            });
        });
    };
    CommentsQueryRepository.findCommentEntityById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collections_1.commentsCollection.findOne({
                            id: id,
                        })];
                    case 1:
                        comment = _a.sent();
                        if (!comment) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                id: comment.id,
                                content: comment.content,
                                commentatorInfo: {
                                    userId: comment.commentator.id,
                                    userLogin: comment.commentator.login,
                                },
                                createdAt: comment.createdAt,
                            }];
                }
            });
        });
    };
    return CommentsQueryRepository;
}());
exports.CommentsQueryRepository = CommentsQueryRepository;
//# sourceMappingURL=comments.query-repository.js.map