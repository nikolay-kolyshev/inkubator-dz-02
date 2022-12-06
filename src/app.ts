import * as bodyParser from 'body-parser';
import express from 'express';
import { rootRouter } from './routing';

export const app = express();

app.use(bodyParser.json());
app.use('/', rootRouter);
