"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosRepository = void 0;
var inversify_1 = require("inversify");
var inversify_binding_decorators_1 = require("inversify-binding-decorators");
var mobx_1 = require("mobx");
var logger_1 = require("../../common/logger/logger");
var logger_constants_1 = require("../../common/logger/logger.constants");
var videos_constants_1 = require("./videos.constants");
var videosDB = [];
var VideosRepository = /** @class */ (function () {
    function VideosRepository(logger) {
        var _this = this;
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: logger
        });
        Object.defineProperty(this, "videos", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: videosDB
        });
        (0, mobx_1.makeAutoObservable)(this);
        (0, mobx_1.autorun)(function () {
            videosDB = __spreadArray([], _this.videos, true);
            _this.logger.info('Videos changed', videosDB.map(function (field) { return field; }));
        });
    }
    Object.defineProperty(VideosRepository.prototype, "clearAllVideos", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.videos = [];
        }
    });
    Object.defineProperty(VideosRepository.prototype, "createVideo", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (video) {
            this.videos = __spreadArray(__spreadArray([], this.videos, true), [__assign(__assign({}, video), { id: this.videos.length })], false);
            this.logger.info('Video crated', this.videos);
        }
    });
    Object.defineProperty(VideosRepository.prototype, "updateVideo", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id, videoCandidate) {
            var isVideoFounded = false;
            this.videos = this.videos.map(function (video) {
                if (+video.id === id) {
                    isVideoFounded = true;
                    return __assign(__assign({}, video), { videoCandidate: videoCandidate });
                }
                return video;
            });
            return isVideoFounded ? videoCandidate : null;
        }
    });
    Object.defineProperty(VideosRepository.prototype, "deleteVideoById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id) {
            this.videos = this.videos.filter(function (video) { return id !== video.id; });
        }
    });
    Object.defineProperty(VideosRepository.prototype, "getVideoById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id) {
            var foundedVideo = this.findVideoById(id);
            return foundedVideo ? foundedVideo : null;
        }
    });
    Object.defineProperty(VideosRepository.prototype, "getAllVideos", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.videos;
        }
    });
    Object.defineProperty(VideosRepository.prototype, "getVideosLength", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.videos.length;
        }
    });
    Object.defineProperty(VideosRepository.prototype, "findVideoById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id) {
            return this.videos.find(function (video) { return id === video.id; });
        }
    });
    VideosRepository = __decorate([
        (0, inversify_binding_decorators_1.provide)(videos_constants_1.VIDEOS_IDS.VideosRepository),
        __param(0, (0, inversify_1.inject)(logger_constants_1.LOGGER_IDS.Logger)),
        __metadata("design:paramtypes", [logger_1.Logger])
    ], VideosRepository);
    return VideosRepository;
}());
exports.VideosRepository = VideosRepository;
//# sourceMappingURL=videos.repository.js.map