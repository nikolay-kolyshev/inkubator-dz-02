import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Nullable } from '../../common/types';
import { VIDEOS_IDS } from './videos.constants';
import { UpdateVideoDto } from './videos.dto';
import { VideosRepository } from './videos.repository';
import { TVideoSchema } from './videos.types';

@provide(VIDEOS_IDS.VideosService)
export class VideosService {
    constructor(@inject(VIDEOS_IDS.VideosRepository) private videosRepository: VideosRepository) {}

    public createVideo(video: TVideoSchema) {
        this.videosRepository.createVideo(video);
        if (this.getVideoById(video.id)) {
            return video;
        } else {
            throw new Error('Video was not added');
        }
    }

    public updateVideo(id: number, video: UpdateVideoDto) {
        const videoCandidate = this.videosRepository.updateVideo(id, video);
        if (videoCandidate) {
            return videoCandidate;
        } else {
            throw new Error('Video was not found');
        }
    }

    public deleteVideoById(id: number): boolean {
        this.videosRepository.deleteVideoById(id);
        if (this.getVideoById(id)) {
            throw new Error('Video was not deleted');
        } else {
            return true;
        }
    }

    public getAllVideos(): TVideoSchema[] {
        return this.videosRepository.getAllVideos();
    }

    public getVideoById(id: number): Nullable<TVideoSchema> {
        const foundedVideo = this.videosRepository.getVideoById(id);
        return foundedVideo ? foundedVideo : null;
    }

    public getVideosLength(): number {
        return this.videosRepository.getVideosLength();
    }
}
