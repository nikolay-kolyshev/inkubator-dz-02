"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
exports.settings = {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    databaseUrl: process.env.DATABASE_URL || 'localhost',
    port: process.env.PORT || 3500,
};
//# sourceMappingURL=index.js.map