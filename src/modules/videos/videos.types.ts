import { Nullable } from '../../common/types';

export type TVideoSchema = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded?: boolean;
    minAgeRestriction?: Nullable<number>;
    createdAt?: string;
    publicationDate?: string;
    availableResolutions?: EAvailableResolution[];
};

export enum EAvailableResolution {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160',
}

export interface IVideosRepository {
    clearAllVideos(): void;
    createVideo(video: TVideoSchema): void;
    deleteVideoById(id: number): void;
    getVideoById(id: number): Nullable<TVideoSchema>;
    getAllVideos(): TVideoSchema[];
    getVideosLength(): number;
}
