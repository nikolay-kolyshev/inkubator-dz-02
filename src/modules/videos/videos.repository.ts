import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { autorun, makeAutoObservable } from 'mobx';
import { Logger } from '../../common/logger/logger';
import { LOGGER_IDS } from '../../common/logger/logger.constants';
import { VIDEOS_IDS } from './videos.constants';
import { UpdateVideoDto } from './videos.dto';
import { IVideosRepository, TVideoSchema } from './videos.types';

let videosDB: TVideoSchema[] = [];

@provide(VIDEOS_IDS.VideosRepository)
export class VideosRepository implements IVideosRepository {
    private videos: TVideoSchema[] = videosDB;

    constructor(@inject(LOGGER_IDS.Logger) private logger: Logger) {
        makeAutoObservable(this);
        autorun(() => {
            videosDB = [...this.videos];
            this.logger.info(
                'Videos changed',
                videosDB.map((field) => field),
            );
        });
    }

    public clearAllVideos() {
        this.videos = [];
    }

    public createVideo(video: TVideoSchema) {
        this.videos = [...this.videos, { ...video, id: this.videos.length }];
        this.logger.info('Video crated', this.videos);
    }

    public updateVideo(id: number, videoCandidate: UpdateVideoDto): TVideoSchema | null {
        let updatedVideo = null;

        this.videos = this.videos.map((video) => {
            if (+video.id === id) {
                updatedVideo = { ...video, videoCandidate };
                return updatedVideo;
            }
            return video;
        });

        return updatedVideo ?? null;
    }

    public deleteVideoById(id: number) {
        this.videos = this.videos.filter((video) => id !== video.id);
    }

    public getVideoById(id: number): TVideoSchema | null {
        const foundedVideo = this.findVideoById(id);
        return foundedVideo ? foundedVideo : null;
    }

    public getAllVideos(): TVideoSchema[] {
        return this.videos;
    }

    public getVideosLength(): number {
        return this.videos.length;
    }

    private findVideoById(id: number): TVideoSchema | undefined {
        return this.videos.find((video) => id === video.id);
    }
}
