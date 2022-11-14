"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./ioc/index");
var bodyParser = require("body-parser");
var inversify_1 = require("inversify");
var inversify_binding_decorators_1 = require("inversify-binding-decorators");
var inversify_express_utils_1 = require("inversify-express-utils");
var PORT = process.env.PORT || 3500;
var container = new inversify_1.Container();
container.load((0, inversify_binding_decorators_1.buildProviderModule)());
var server = new inversify_express_utils_1.InversifyExpressServer(container);
server.setConfig(function (app) {
    app.use(bodyParser.json());
});
var serverInstance = server.build();
serverInstance.listen(PORT);
console.log("Server started on port ".concat(PORT));
//# sourceMappingURL=index.js.map