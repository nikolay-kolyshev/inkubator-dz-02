import * as bodyParser from 'body-parser';
import express from 'express';

const PORT = process.env.PORT || 3500;

const app = express();

app.use(bodyParser());

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
