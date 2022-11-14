"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVAILABLE_RESOLUTIONS = exports.VIDEOS_IDS = void 0;
var videos_types_1 = require("./videos.types");
exports.VIDEOS_IDS = {
    VideosService: Symbol.for('VideosService'),
    VideosRepository: Symbol.for('VideosRepository'),
};
exports.AVAILABLE_RESOLUTIONS = Object.values(videos_types_1.EAvailableResolution);
//# sourceMappingURL=videos.constants.js.map