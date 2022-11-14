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
import { FieldValidator } from '../../common/field-validator/field-validator';
import { AVAILABLE_RESOLUTIONS, VIDEOS_IDS } from './videos.constants';
import { CreateVideoDto, UpdateVideoDto } from './videos.dto';
import { VideosService } from './videos.service';
import { TVideoSchema } from './videos.types';

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

        const fieldValidator = new FieldValidator();
        availableResolutions?.map((value, index) => {
            fieldValidator.addFieldValidation({
                fieldName: 'availableResolutions',
                errorMessage: 'You did not provide correct resolution',
                errorCondition: !AVAILABLE_RESOLUTIONS.includes(value),
            });
        });
        const errorsMessages = fieldValidator
            .addFieldValidation({
                fieldName: 'title',
                errorMessage: `You don't have title or the title is incorrect`,
                errorCondition: !title || title.length > 40 || title.trim().length === 0 || typeof title !== 'string',
            })
            .addFieldValidation({
                fieldName: 'author',
                errorMessage: `You don't have author or author is incorrect`,
                errorCondition:
                    !author || author.length > 20 || author.trim().length === 0 || typeof author !== 'string',
            })
            .addFieldValidation({
                fieldName: 'availableResolutions',
                errorMessage: `You don't have availableResolutions`,
                errorCondition:
                    !availableResolutions ||
                    availableResolutions.length > AVAILABLE_RESOLUTIONS.length ||
                    availableResolutions.length === 0,
            }).finishAndReturnErrorMessages;

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
            availableResolutions,
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

        const fieldValidator = new FieldValidator();
        availableResolutions?.map((value, index) => {
            fieldValidator.addFieldValidation({
                fieldName: 'availableResolutions',
                errorMessage: 'You did not provide correct resolution',
                errorCondition: !AVAILABLE_RESOLUTIONS.includes(value),
            });
        });
        const errorsMessages = fieldValidator
            .addFieldValidation({
                fieldName: 'title',
                errorMessage: `You don't have title or the title is incorrect`,
                errorCondition: !title || title.length > 40 || title.trim().length === 0 || typeof title !== 'string',
            })
            .addFieldValidation({
                fieldName: 'author',
                errorMessage: `You don't have author or author is incorrect`,
                errorCondition:
                    !author || author.length > 20 || author.trim().length === 0 || typeof author !== 'string',
            })
            .addFieldValidation({
                fieldName: 'availableResolutions',
                errorMessage: `You don't have availableResolutions`,
                errorCondition:
                    !availableResolutions ||
                    availableResolutions.length > AVAILABLE_RESOLUTIONS.length ||
                    availableResolutions.length === 0,
            })
            .addFieldValidation({
                fieldName: 'minAgeRestriction',
                errorMessage: `I know you cant test this -_-`,
                errorCondition:
                    !minAgeRestriction ||
                    minAgeRestriction < 1 ||
                    minAgeRestriction > 18 ||
                    typeof minAgeRestriction !== 'number',
            })
            .addFieldValidation({
                fieldName: 'publicationDate',
                errorMessage: `Это самурайский бекенннннннд`,
                errorCondition: !publicationDate || typeof publicationDate !== 'string',
            })
            .addFieldValidation({
                fieldName: 'canBeDownloaded',
                errorMessage: `Это самурайский бекенннннннд!`,
                errorCondition: typeof canBeDownloaded !== 'boolean',
            }).finishAndReturnErrorMessages;

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
            availableResolutions,
        };

        try {
            const videoCandidate = this.videosService.updateVideo(id, newVideo);
            if (!videoCandidate) {
                res.sendStatus(STATUS_CODES.NOT_FOUND);
                return;
            }
        } catch (error) {
            res.sendStatus(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }

        res.status(STATUS_CODES.NO_CONTENT).send(newVideo);
    }
}
