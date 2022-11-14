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
exports.VideosController = void 0;
var addDays_1 = require("date-fns/addDays");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var constants_1 = require("../../common/constants");
var field_validator_1 = require("../../common/field-validator/field-validator");
var videos_constants_1 = require("./videos.constants");
var videos_service_1 = require("./videos.service");
var VideosController = /** @class */ (function () {
    function VideosController(videosService) {
        Object.defineProperty(this, "videosService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: videosService
        });
        console.log('VideosController constructor');
    }
    Object.defineProperty(VideosController.prototype, "getAllVideos", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.videosService.getAllVideos();
        }
    });
    Object.defineProperty(VideosController.prototype, "getVideoById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id, res) {
            var videoCandidate = this.videosService.getVideoById(+id);
            if (!videoCandidate) {
                res.sendStatus(constants_1.STATUS_CODES.NOT_FOUND);
                return;
            }
            return res.status(constants_1.STATUS_CODES.OK).send(videoCandidate);
        }
    });
    Object.defineProperty(VideosController.prototype, "deleteVideoById", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id, res) {
            var videoCandidate = this.videosService.getVideoById(+id);
            if (!videoCandidate) {
                res.sendStatus(constants_1.STATUS_CODES.NOT_FOUND);
            }
            try {
                this.videosService.deleteVideoById(+id);
            }
            catch (error) {
                res.sendStatus(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
            return res.sendStatus(constants_1.STATUS_CODES.NO_CONTENT);
        }
    });
    Object.defineProperty(VideosController.prototype, "createVideo", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (req, res) {
            var _a = req.body, title = _a.title, author = _a.author, availableResolutions = _a.availableResolutions, minAgeRestriction = _a.minAgeRestriction, publicationDate = _a.publicationDate, canBeDownloaded = _a.canBeDownloaded;
            var fieldValidator = new field_validator_1.FieldValidator();
            availableResolutions === null || availableResolutions === void 0 ? void 0 : availableResolutions.map(function (value, index) {
                fieldValidator.addFieldValidation({
                    fieldName: 'availableResolutions',
                    errorMessage: 'You did not provide correct resolution',
                    errorCondition: !videos_constants_1.AVAILABLE_RESOLUTIONS.includes(value),
                });
            });
            var errorsMessages = fieldValidator
                .addFieldValidation({
                fieldName: 'title',
                errorMessage: "You don't have title or the title is incorrect",
                errorCondition: !title || title.length > 40 || title.trim().length === 0 || typeof title !== 'string',
            })
                .addFieldValidation({
                fieldName: 'author',
                errorMessage: "You don't have author or author is incorrect",
                errorCondition: !author || author.length > 20 || author.trim().length === 0 || typeof author !== 'string',
            })
                .addFieldValidation({
                fieldName: 'availableResolutions',
                errorMessage: "You don't have availableResolutions",
                errorCondition: !availableResolutions ||
                    availableResolutions.length > videos_constants_1.AVAILABLE_RESOLUTIONS.length ||
                    availableResolutions.length === 0,
            }).finishAndReturnErrorMessages;
            if (errorsMessages.length >= 1) {
                res.status(constants_1.STATUS_CODES.BAD_REQUEST).send({ errorsMessages: errorsMessages });
                return;
            }
            var newVideo = {
                id: this.videosService.getVideosLength(),
                title: title,
                author: author,
                canBeDownloaded: canBeDownloaded || false,
                minAgeRestriction: minAgeRestriction || null,
                createdAt: new Date().toISOString(),
                publicationDate: publicationDate || (0, addDays_1.default)(new Date(), 1).toISOString(),
                availableResolutions: availableResolutions,
            };
            try {
                this.videosService.createVideo(newVideo);
            }
            catch (error) {
                res.sendStatus(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
            res.status(constants_1.STATUS_CODES.CREATED).send(newVideo);
        }
    });
    Object.defineProperty(VideosController.prototype, "updateVideo", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id, req, res) {
            var _a = req.body, title = _a.title, author = _a.author, availableResolutions = _a.availableResolutions, minAgeRestriction = _a.minAgeRestriction, publicationDate = _a.publicationDate, canBeDownloaded = _a.canBeDownloaded;
            if (!this.videosService.getVideoById(+id)) {
                res.sendStatus(constants_1.STATUS_CODES.NOT_FOUND);
                return;
            }
            var fieldValidator = new field_validator_1.FieldValidator();
            availableResolutions === null || availableResolutions === void 0 ? void 0 : availableResolutions.map(function (value) {
                fieldValidator.addFieldValidation({
                    fieldName: 'availableResolutions',
                    errorMessage: 'You did not provide correct resolution',
                    errorCondition: !videos_constants_1.AVAILABLE_RESOLUTIONS.includes(value),
                });
            });
            var errorsMessages = fieldValidator
                .addFieldValidation({
                fieldName: 'title',
                errorMessage: "You don't have title or the title is incorrect",
                errorCondition: !title || title.length > 40 || title.trim().length === 0 || typeof title !== 'string',
            })
                .addFieldValidation({
                fieldName: 'author',
                errorMessage: "You don't have author or author is incorrect",
                errorCondition: !author || author.length > 20 || author.trim().length === 0 || typeof author !== 'string',
            })
                .addFieldValidation({
                fieldName: 'availableResolutions',
                errorMessage: "You don't have availableResolutions",
                errorCondition: !availableResolutions ||
                    availableResolutions.length > videos_constants_1.AVAILABLE_RESOLUTIONS.length ||
                    availableResolutions.length === 0,
            })
                .addFieldValidation({
                fieldName: 'minAgeRestriction',
                errorMessage: "I know you cant test this -_-",
                errorCondition: !minAgeRestriction ||
                    minAgeRestriction < 1 ||
                    minAgeRestriction > 18 ||
                    typeof minAgeRestriction !== 'number',
            })
                .addFieldValidation({
                fieldName: 'publicationDate',
                errorMessage: "\u042D\u0442\u043E \u0441\u0430\u043C\u0443\u0440\u0430\u0439\u0441\u043A\u0438\u0439 \u0431\u0435\u043A\u0435\u043D\u043D\u043D\u043D\u043D\u043D\u043D\u0434",
                errorCondition: !publicationDate || typeof publicationDate !== 'string',
            })
                .addFieldValidation({
                fieldName: 'canBeDownloaded',
                errorMessage: "\u042D\u0442\u043E \u0441\u0430\u043C\u0443\u0440\u0430\u0439\u0441\u043A\u0438\u0439 \u0431\u0435\u043A\u0435\u043D\u043D\u043D\u043D\u043D\u043D\u043D\u0434!",
                errorCondition: typeof canBeDownloaded !== 'boolean',
            }).finishAndReturnErrorMessages;
            if (errorsMessages.length >= 1) {
                res.status(constants_1.STATUS_CODES.BAD_REQUEST).send({ errorsMessages: errorsMessages });
                return;
            }
            var newVideo = {
                title: title,
                author: author,
                canBeDownloaded: canBeDownloaded,
                minAgeRestriction: minAgeRestriction,
                publicationDate: publicationDate,
                availableResolutions: availableResolutions,
            };
            var videoCandidate = this.videosService.updateVideo(+id, newVideo);
            res.status(constants_1.STATUS_CODES.NO_CONTENT).send(videoCandidate);
        }
    });
    __decorate([
        (0, inversify_express_utils_1.httpGet)('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Array)
    ], VideosController.prototype, "getAllVideos", null);
    __decorate([
        (0, inversify_express_utils_1.httpGet)('/:id'),
        __param(0, (0, inversify_express_utils_1.requestParam)('id')),
        __param(1, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", void 0)
    ], VideosController.prototype, "getVideoById", null);
    __decorate([
        (0, inversify_express_utils_1.httpDelete)('/:id'),
        __param(0, (0, inversify_express_utils_1.requestParam)('id')),
        __param(1, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", void 0)
    ], VideosController.prototype, "deleteVideoById", null);
    __decorate([
        (0, inversify_express_utils_1.httpPost)('/'),
        __param(0, (0, inversify_express_utils_1.request)()),
        __param(1, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], VideosController.prototype, "createVideo", null);
    __decorate([
        (0, inversify_express_utils_1.httpPut)('/:id'),
        __param(0, (0, inversify_express_utils_1.requestParam)('id')),
        __param(1, (0, inversify_express_utils_1.request)()),
        __param(2, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, Object]),
        __metadata("design:returntype", void 0)
    ], VideosController.prototype, "updateVideo", null);
    VideosController = __decorate([
        (0, inversify_express_utils_1.controller)('/videos'),
        __param(0, (0, inversify_1.inject)(videos_constants_1.VIDEOS_IDS.VideosService)),
        __metadata("design:paramtypes", [videos_service_1.VideosService])
    ], VideosController);
    return VideosController;
}());
exports.VideosController = VideosController;
//# sourceMappingURL=videos.controller.js.map