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
exports.BlogsController = void 0;
var constants_1 = require("../../common/constants");
var blogs_repository_1 = require("./blogs.repository");
var BlogsController = /** @class */ (function () {
    function BlogsController() {
    }
    BlogsController.getAllBlogs = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var blogs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blogs_repository_1.BlogsRepository.findAllBlogs()];
                    case 1:
                        blogs = _a.sent();
                        res.status(constants_1.STATUS_CODES.OK).json(blogs);
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogsController.postBlog = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var blogCandidate, blog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blogCandidate = req.body;
                        return [4 /*yield*/, blogs_repository_1.BlogsRepository.createBlog(blogCandidate)];
                    case 1:
                        blog = _a.sent();
                        res.status(constants_1.STATUS_CODES.CREATED).json(blog);
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogsController.getBlogById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var blog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blogs_repository_1.BlogsRepository.findBlogById(req.params.id)];
                    case 1:
                        blog = _a.sent();
                        if (!blog) {
                            res.status(constants_1.STATUS_CODES.NOT_FOUND);
                            return [2 /*return*/];
                        }
                        res.status(constants_1.STATUS_CODES.OK).json(blog);
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogsController.putBlogById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var blogWithUpdate, isBlogUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blogWithUpdate = req.body;
                        return [4 /*yield*/, blogs_repository_1.BlogsRepository.updateBlogById(req.params.id, blogWithUpdate)];
                    case 1:
                        isBlogUpdated = _a.sent();
                        if (!isBlogUpdated) {
                            res.status(constants_1.STATUS_CODES.NOT_FOUND);
                            return [2 /*return*/];
                        }
                        res.status(constants_1.STATUS_CODES.NO_CONTENT);
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogsController.deleteBlogById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var isBlogDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blogs_repository_1.BlogsRepository.deleteBLogById(req.params.id)];
                    case 1:
                        isBlogDeleted = _a.sent();
                        if (!isBlogDeleted) {
                            res.status(constants_1.STATUS_CODES.NOT_FOUND);
                            return [2 /*return*/];
                        }
                        res.status(constants_1.STATUS_CODES.NO_CONTENT);
                        return [2 /*return*/];
                }
            });
        });
    };
    return BlogsController;
}());
exports.BlogsController = BlogsController;
//# sourceMappingURL=blogs.controller.js.map