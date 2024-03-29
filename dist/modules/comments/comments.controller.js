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
exports.CommentsController = void 0;
var constants_1 = require("../../common/constants");
var collections_1 = require("../../database/collections");
var comments_query_repository_1 = require("./comments.query-repository");
var comments_service_1 = require("./comments.service");
var CommentsController = /** @class */ (function () {
    function CommentsController() {
    }
    CommentsController.getCommentById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.commentId;
                        return [4 /*yield*/, comments_service_1.CommentsService.getById(id)];
                    case 1:
                        foundComment = _a.sent();
                        if (!foundComment) {
                            res.sendStatus(constants_1.STATUS_CODES.NOT_FOUND);
                            return [2 /*return*/];
                        }
                        res.json(foundComment);
                        return [2 /*return*/];
                }
            });
        });
    };
    CommentsController.putCommentById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundComment, isCommentUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.commentId;
                        return [4 /*yield*/, comments_query_repository_1.CommentsQueryRepository.findCommentEntityById(id)];
                    case 1:
                        foundComment = _a.sent();
                        if (!foundComment) {
                            res.sendStatus(constants_1.STATUS_CODES.NOT_FOUND);
                            return [2 /*return*/];
                        }
                        if (foundComment.commentatorInfo.userId !== req.userId) {
                            res.sendStatus(constants_1.STATUS_CODES.FORBIDDEN);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, comments_service_1.CommentsService.updateById(id, req.body)];
                    case 2:
                        isCommentUpdated = _a.sent();
                        if (!isCommentUpdated) {
                            res.sendStatus(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR);
                            return [2 /*return*/];
                        }
                        res.sendStatus(constants_1.STATUS_CODES.NO_CONTENT);
                        return [2 /*return*/];
                }
            });
        });
    };
    CommentsController.deleteCommentById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundComment, isCommentDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, comments_query_repository_1.CommentsQueryRepository.findCommentEntityById(id)];
                    case 1:
                        foundComment = _a.sent();
                        if (!foundComment) {
                            res.sendStatus(constants_1.STATUS_CODES.NOT_FOUND);
                            return [2 /*return*/];
                        }
                        if (foundComment.commentatorInfo.userId !== req.userId) {
                            res.sendStatus(constants_1.STATUS_CODES.FORBIDDEN);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, comments_service_1.CommentsService.deleteById(id)];
                    case 2:
                        isCommentDeleted = _a.sent();
                        if (!isCommentDeleted) {
                            res.sendStatus(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR);
                            return [2 /*return*/];
                        }
                        res.sendStatus(constants_1.STATUS_CODES.NO_CONTENT);
                        return [2 /*return*/];
                }
            });
        });
    };
    CommentsController.deleteAllComments = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collections_1.commentsCollection.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CommentsController;
}());
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map