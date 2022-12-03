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
exports.postsValidation = void 0;
var express_validator_1 = require("express-validator");
var blogs_repository_1 = require("../blogs/blogs.repository");
exports.postsValidation = {
    inputBody: [
        (0, express_validator_1.body)('title')
            .exists()
            .withMessage('title должен находиться в теле запроса')
            .isString()
            .withMessage('title должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('title не может быть пустым')
            .isLength({ min: 1, max: 30 })
            .withMessage('title должен быть от 1 до 30 символов'),
        (0, express_validator_1.body)('shortDescription')
            .exists()
            .withMessage('title должен находиться в теле запроса')
            .isString()
            .withMessage('shortDescription должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('shortDescription не может быть пустым')
            .isLength({ min: 1, max: 300 })
            .withMessage('shortDescription должен быть от 1 до 300 символов'),
        (0, express_validator_1.body)('content')
            .exists()
            .withMessage('content должен находиться в теле запроса')
            .isString()
            .withMessage('content должен быть строкой')
            .trim()
            .notEmpty()
            .withMessage('content не может быть пустым')
            .isLength({ min: 1, max: 1000 })
            .withMessage('shortDescription должен быть от 1 до 1000 символов'),
        (0, express_validator_1.body)('blogId')
            .exists()
            .withMessage('blogId должен находиться в теле запроса')
            .isString()
            .withMessage('blogId должен быть строкой')
            .notEmpty()
            .withMessage('blogId не может быть пустым')
            .trim()
            .isLength({ min: 1 })
            .withMessage('blogId должен иметь длину не менее 1 символа')
            .isUUID()
            .withMessage('blogId должен быть UUID')
            .custom(function (id) { return __awaiter(void 0, void 0, void 0, function () {
            var foundedBlog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blogs_repository_1.BlogsRepository.findBlogById(id)];
                    case 1:
                        foundedBlog = _a.sent();
                        if (!foundedBlog) {
                            throw new Error('Блог с таким blogId не найден. Пожалуйста, проверьте blogId');
                        }
                        return [2 /*return*/, true];
                }
            });
        }); }),
    ],
    update: [(0, express_validator_1.param)('id').exists().notEmpty().isString().isLength({ min: 1 }).isUUID()],
};
//# sourceMappingURL=posts.validation.js.map