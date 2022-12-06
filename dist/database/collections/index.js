"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsCollection = exports.blogsCollection = void 0;
var index_1 = require("../index");
var database = index_1.databaseClient.db();
exports.blogsCollection = database.collection('blogs');
exports.postsCollection = database.collection('posts');
//# sourceMappingURL=index.js.map