"use strict";
/* Маршрутизация PL-роутов */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
var express_1 = require("express");
var blogs_router_1 = __importDefault(require("../modules/blogs/blogs.router"));
var posts_router_1 = __importDefault(require("../modules/posts/posts.router"));
var testing_router_1 = __importDefault(require("../modules/testing/testing.router"));
exports.rootRouter = (0, express_1.Router)();
exports.rootRouter.use('/blogs', blogs_router_1.default);
exports.rootRouter.use('/posts', posts_router_1.default);
exports.rootRouter.use('/testing', testing_router_1.default);
//# sourceMappingURL=index.js.map