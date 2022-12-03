"use strict";
/* Testing route */
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var testing_controller_1 = require("./testing.controller");
var blogsRouter = (0, express_1.Router)();
blogsRouter.get('/all-data', testing_controller_1.TestingController.deleteAllData);
exports.default = blogsRouter;
//# sourceMappingURL=testing.router.js.map