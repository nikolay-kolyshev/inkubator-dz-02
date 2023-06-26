"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
exports.settings = {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    databaseUrl: process.env.DATABASE_URL || 'localhost',
    port: process.env.PORT || 3500,
    mailTransport: {
        host: process.env.MAIL_TRANSPORT_HOST || '',
        port: Number.parseInt((_a = process.env.MAIL_TRANSPORT_PORT) !== null && _a !== void 0 ? _a : ''),
        user: process.env.MAIL_TRANSPORT_USER || '',
        password: process.env.MAIL_TRANSPORT_PASSWORD || '',
    },
};
//# sourceMappingURL=index.js.map