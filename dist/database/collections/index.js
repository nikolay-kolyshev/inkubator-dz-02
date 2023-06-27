"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsCollection = exports.postsCollection = exports.blogsCollection = exports.bannedTokensCollection = exports.usersCollection = void 0;
var index_1 = require("../index");
var database = index_1.databaseClient.db();
exports.usersCollection = database.collection('users');
exports.bannedTokensCollection = database.collection('auth');
exports.blogsCollection = database.collection('blogs');
exports.postsCollection = database.collection('posts');
exports.commentsCollection = database.collection('users');
//# sourceMappingURL=index.js.map