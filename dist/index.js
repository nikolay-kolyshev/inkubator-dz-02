"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var PORT = process.env.PORT || 3500;
app_1.app.listen(PORT, function () {
    console.log("Server is listening on port ".concat(PORT));
});
//# sourceMappingURL=index.js.map