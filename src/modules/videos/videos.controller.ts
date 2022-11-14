import addDays from 'date-fns/addDays';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    request,
    requestParam,
    response,
} from 'inversify-express-utils';
import { STATUS_CODES } from '../../common/constants';
import { VIDEOS_IDS } from './videos.constants';
import { CreateVideoDto, UpdateVideoDto } from './videos.dto';
import { VideosService } from './videos.service';
import { TVideoSchema } from './videos.types';
import { VideosValidator } from './videos.validator';

@controller('/videos')
export class VideosController {
    constructor(@inject(VIDEOS_IDS.VideosService) private videosService: VideosService) {
        console.log('VideosController constructor');
    }

    @httpGet('/')
    public getAllVideos(): TVideoSchema[] {
        return this.videosService.getAllVideos();
    }

    @httpGet('/:id')
    public getVideoById(@requestParam('id') id: number, @response() res: Response<TVideoSchema>) {
        const videoCandidate = this.videosService.getVideoById(+id);
        if (!videoCandidate) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }
        return res.status(STATUS_CODES.OK).send(videoCandidate);
    }

    @httpDelete('/:id')
    public deleteVideoById(@requestParam('id') id: number, @response() res: Response) {
        const videoCandidate = this.videosService.getVideoById(+id);
        if (!videoCandidate) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
        }
        try {
            this.videosService.deleteVideoById(+id);
        } catch (error) {
            res.sendStatus(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
        return res.sendStatus(STATUS_CODES.NO_CONTENT);
    }

    @httpPost('/')
    public createVideo(
        @request() req: Request<{}, {}, CreateVideoDto>,
        @response() res: Response<TVideoSchema | { errorsMessages: Array<{ message: string; field: string }> }>,
    ) {
        const { title, author, availableResolutions, minAgeRestriction, publicationDate, canBeDownloaded } = req.body;

        const errorsMessages = VideosValidator.validateCreateVideo(req.body);

        if (errorsMessages.length >= 1) {
            res.status(STATUS_CODES.BAD_REQUEST).send({ errorsMessages });
            return;
        }

        const newVideo: TVideoSchema = {
            id: this.videosService.getVideosLength(),
            title,
            author,
            canBeDownloaded: canBeDownloaded || false,
            minAgeRestriction: minAgeRestriction || null,
            createdAt: new Date().toISOString(),
            publicationDate: publicationDate || addDays(new Date(), 1).toISOString(),
            availableResolutions: availableResolutions ?? null,
        };

        try {
            this.videosService.createVideo(newVideo);
        } catch (error) {
            res.sendStatus(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }

        res.status(STATUS_CODES.CREATED).send(newVideo);
    }

    @httpPut('/:id')
    public updateVideo(
        @requestParam('id') id: number,
        @request() req: Request<{}, {}, UpdateVideoDto>,
        @response() res: Response<TVideoSchema | { errorsMessages: Array<{ message: string; field: string }> }>,
    ) {
        const { title, author, availableResolutions, minAgeRestriction, publicationDate, canBeDownloaded } = req.body;

        if (!this.videosService.getVideoById(+id)) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }

        const errorsMessages = VideosValidator.validateUpdateVideo(req.body);

        if (errorsMessages.length >= 1) {
            res.status(STATUS_CODES.BAD_REQUEST).send({ errorsMessages });
            return;
        }

        const newVideo: UpdateVideoDto = {
            title,
            author,
            canBeDownloaded: canBeDownloaded || false,
            minAgeRestriction: minAgeRestriction || null,
            publicationDate: publicationDate || addDays(new Date(), 1).toISOString(),
            availableResolutions: availableResolutions ?? null,
        };

        const videoCandidate = this.videosService.updateVideo(+id, newVideo);

        res.status(STATUS_CODES.NO_CONTENT).send(videoCandidate);
    }
}
