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
exports.BlogsService = void 0;
var generateDate_1 = require("../../common/utils/generateDate");
var generateId_1 = require("../../common/utils/generateId");
var blogs_repository_1 = require("./blogs.repository");
var BlogsService = /** @class */ (function () {
    function BlogsService() {
    }
    BlogsService.findAllBlogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blogs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blogs_repository_1.BlogsRepository.findAllBlogs()];
                    case 1:
                        blogs = _a.sent();
                        return [2 /*return*/, blogs.map(function (blog) { return ({
                                id: blog.id,
                                name: blog.name,
                                description: blog.description,
                                createdAt: blog.createdAt,
                                websiteUrl: blog.websiteUrl,
                            }); })];
                }
            });
        });
    };
    BlogsService.createBlog = function (blogDTO) {
        return __awaiter(this, void 0, void 0, function () {
            var blogCandidate, createdBlog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blogCandidate = __assign({ id: (0, generateId_1.generateId)(), createdAt: (0, generateDate_1.generateDate)() }, blogDTO);
                        return [4 /*yield*/, blogs_repository_1.BlogsRepository.createBlog(blogCandidate)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, blogs_repository_1.BlogsRepository.findBlogById(blogCandidate.id)];
                    case 2:
                        createdBlog = _a.sent();
                        if (!createdBlog) {
                            throw new Error('Blog was not created');
                        }
                        return [2 /*return*/, {
                                id: createdBlog.id,
                                name: createdBlog.name,
                                description: createdBlog.description,
                                websiteUrl: createdBlog.websiteUrl,
                                createdAt: createdBlog.createdAt,
                            }];
                }
            });
        });
    };
    BlogsService.findBlogById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, blogs_repository_1.BlogsRepository.findBlogById(id)];
            });
        });
    };
    BlogsService.updateBlogById = function (id, blogWithUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var blogCandidate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blogCandidate = blogs_repository_1.BlogsRepository.findBlogById(id);
                        if (!blogCandidate) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, blogs_repository_1.BlogsRepository.updateBlogById(id, __assign(__assign({}, blogWithUpdate), { createdAt: (0, generateDate_1.generateDate)() }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    BlogsService.deleteBLogById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var blogCandidate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blogCandidate = blogs_repository_1.BlogsRepository.findBlogById(id);
                        if (!blogCandidate) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, blogs_repository_1.BlogsRepository.deleteBLogById(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    BlogsService.deleteAllBlogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blogs_repository_1.BlogsRepository.deleteAllBlogs()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BlogsService;
}());
exports.BlogsService = BlogsService;
//# sourceMappingURL=blogs.service.js.map