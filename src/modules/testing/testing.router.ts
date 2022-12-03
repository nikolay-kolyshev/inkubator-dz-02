/* Testing route */

import { Router } from 'express';
import { TestingController } from './testing.controller';

const blogsRouter = Router();

blogsRouter.get('/all-data', TestingController.deleteAllData);

export default blogsRouter;
