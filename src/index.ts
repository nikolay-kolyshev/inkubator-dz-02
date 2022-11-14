import 'reflect-metadata';
import './ioc/index';

import * as bodyParser from 'body-parser';
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { InversifyExpressServer } from 'inversify-express-utils';

const PORT = process.env.PORT || 3500;

const container = new Container();
container.load(buildProviderModule());

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(bodyParser.json());
});

const serverInstance = server.build();
serverInstance.listen(PORT);

console.log(`Server started on port ${PORT}`);
