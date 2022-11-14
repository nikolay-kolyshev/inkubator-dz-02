import { EAvailableResolution } from './videos.types';

export const VIDEOS_IDS = {
    VideosService: Symbol.for('VideosService'),
    VideosRepository: Symbol.for('VideosRepository'),
};

export const AVAILABLE_RESOLUTIONS = Object.values(EAvailableResolution);
