import { TVideoSchema } from './videos.types';

export type CreateVideoDto = {
    title: TVideoSchema['title'];
    author: TVideoSchema['author'];
    availableResolutions: TVideoSchema['availableResolutions'];
    minAgeRestriction?: TVideoSchema['minAgeRestriction'];
    publicationDate?: TVideoSchema['publicationDate'];
    canBeDownloaded?: TVideoSchema['canBeDownloaded'];
};

export type UpdateVideoDto = {
    title: TVideoSchema['title'];
    author: TVideoSchema['author'];
    availableResolutions: TVideoSchema['availableResolutions'];
    canBeDownloaded: TVideoSchema['canBeDownloaded'];
    minAgeRestriction: TVideoSchema['minAgeRestriction'];
    publicationDate: TVideoSchema['publicationDate'];
};
