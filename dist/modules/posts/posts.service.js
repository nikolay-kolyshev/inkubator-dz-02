"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.PostsService = void 0;
var constants_1 = require("../../common/constants");
var generateDate_1 = require("../../common/utils/generateDate");
var generateId_1 = require("../../common/utils/generateId");
var blogs_query_repository_1 = require("../blogs/blogs.query-repository");
var comments_service_1 = require("../comments/comments.service");
var posts_query_repository_1 = require("./posts.query-repository");
var posts_repository_1 = require("./posts.repository");
var PostsService = /** @class */ (function () {
    function PostsService() {
    }
    PostsService.createPost = function (postDTO) {
        return __awaiter(this, void 0, void 0, function () {
            var id, createdPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (0, generateId_1.generateId)();
                        return [4 /*yield*/, posts_repository_1.PostsRepository.createPost(__assign({ id: id, createdAt: (0, generateDate_1.generateDate)() }, postDTO))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, posts_query_repository_1.PostsQueryRepository.findPostById(id)];
                    case 2:
                        createdPost = _a.sent();
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        return [2 /*return*/, createdPost];
                }
            });
        });
    };
    PostsService.updatePostById = function (id, postWithUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var foundedPost, foundedBlog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, posts_query_repository_1.PostsQueryRepository.findPostById(id)];
                    case 1:
                        foundedPost = _a.sent();
                        if (!foundedPost) {
                            return [2 /*return*/, {
                                    error: {
                                        message: 'Post not found',
                                        code: constants_1.STATUS_CODES.NOT_FOUND,
                                    },
                                }];
                        }
                        return [4 /*yield*/, blogs_query_repository_1.BlogsQueryRepository.findBlogById(postWithUpdate.blogId)];
                    case 2:
                        foundedBlog = (_a.sent());
                        return [4 /*yield*/, posts_repository_1.PostsRepository.updatePostById(id, __assign(__assign({}, postWithUpdate), { blogName: foundedBlog.name }))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                response: true,
                            }];
                }
            });
        });
    };
    PostsService.deleteBLogById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundedPost, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, posts_query_repository_1.PostsQueryRepository.findPostById(id)];
                    case 1:
                        foundedPost = _a.sent();
                        if (!foundedPost) {
                            return [2 /*return*/, false];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, posts_repository_1.PostsRepository.deleteBLogById(id)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4:
                        e_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PostsService.createCommentByPostId = function (commentCandidate, commentator, postId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, comments_service_1.CommentsService.create(commentCandidate, commentator, postId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PostsService;
}());
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map