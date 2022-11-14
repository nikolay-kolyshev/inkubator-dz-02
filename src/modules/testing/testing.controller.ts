import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpDelete, response } from 'inversify-express-utils';
import { VIDEOS_IDS } from '../videos/videos.constants';
import { VideosService } from '../videos/videos.service';

@controller('/testing')
export class TestingController {
    constructor(@inject(VIDEOS_IDS.VideosService) private videosService: VideosService) {}

    @httpDelete('/all-data')
    public deleteAllVideos(@response() res: Response) {
        this.videosService.getAllVideos();
        return res.sendStatus(204);
    }
}
