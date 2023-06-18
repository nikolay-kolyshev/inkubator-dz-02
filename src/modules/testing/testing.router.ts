/* Testing route */

import { Router } from 'express';
import { TestingController } from './testing.controller';

const testingRouter = Router();

testingRouter.delete('/all-data', TestingController.deleteAllData);

export default testingRouter;
