"use strict";
/* Testing route */
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var testing_controller_1 = require("./testing.controller");
var testingRouter = (0, express_1.Router)();
testingRouter.delete('/all-data', testing_controller_1.TestingController.deleteAllData);
exports.default = testingRouter;
//# sourceMappingURL=testing.router.js.map