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
exports.VideosService = void 0;
var inversify_1 = require("inversify");
var inversify_binding_decorators_1 = require("inversify-binding-decorators");
var videos_constants_1 = require("./videos.constants");
var videos_repository_1 = require("./videos.repository");
var VideosService = /** @class */ (function () {
    function VideosService(videosRepository) {
        Object.defineProperty(this, "videosRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: videosRepository
        });
    }
    Object.defineProperty(VideosService.prototype, "createVideo", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (video) {
            this.videosRepository.createVideo(video);
            if (this.getVideoById(video.id)) {
                return video;
            }
            else {
                throw new Error('Video was not added');
            }
        }
    });
    Object.defineProperty(VideosService.prototype, "updateVideo", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id, video) {
            var videoCandidate = this.videosRepository.updateVideo(id, video);
            if (videoCandidate) {
                return videoCandidate;
            }
            else {
                throw new Error('Video was not found');
            }
        }
    });
    Object.defineProperty(VideosService.prototype, "deleteVideoById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id) {
            this.videosRepository.deleteVideoById(id);
            if (this.getVideoById(id)) {
                throw new Error('Video was not deleted');
            }
            else {
                return true;
            }
        }
    });
    Object.defineProperty(VideosService.prototype, "getAllVideos", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.videosRepository.getAllVideos();
        }
    });
    Object.defineProperty(VideosService.prototype, "getVideoById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id) {
            var foundedVideo = this.videosRepository.getVideoById(id);
            return foundedVideo ? foundedVideo : null;
        }
    });
    Object.defineProperty(VideosService.prototype, "getVideosLength", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.videosRepository.getVideosLength();
        }
    });
    VideosService = __decorate([
        (0, inversify_binding_decorators_1.provide)(videos_constants_1.VIDEOS_IDS.VideosService),
        __param(0, (0, inversify_1.inject)(videos_constants_1.VIDEOS_IDS.VideosRepository)),
        __metadata("design:paramtypes", [videos_repository_1.VideosRepository])
    ], VideosService);
    return VideosService;
}());
exports.VideosService = VideosService;
//# sourceMappingURL=videos.service.js.map