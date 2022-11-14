"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingController = void 0;
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var videos_constants_1 = require("../videos/videos.constants");
var videos_service_1 = require("../videos/videos.service");
var TestingController = /** @class */ (function () {
    function TestingController(videosService) {
        Object.defineProperty(this, "videosService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: videosService
        });
    }
    Object.defineProperty(TestingController.prototype, "deleteAllVideos", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (res) {
            this.videosService.getAllVideos();
            return res.sendStatus(204);
        }
    });
    __decorate([
        (0, inversify_express_utils_1.httpDelete)('/all-data'),
        __param(0, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TestingController.prototype, "deleteAllVideos", null);
    TestingController = __decorate([
        (0, inversify_express_utils_1.controller)('/testing'),
        __param(0, (0, inversify_1.inject)(videos_constants_1.VIDEOS_IDS.VideosService)),
        __metadata("design:paramtypes", [videos_service_1.VideosService])
    ], TestingController);
    return TestingController;
}());
exports.TestingController = TestingController;
//# sourceMappingURL=testing.controller.js.map