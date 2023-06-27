import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { rootRouter } from './routing';

export const app = express();

app.use(bodyParser.json());
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.use(cookieParser());
app.use('/', rootRouter);
