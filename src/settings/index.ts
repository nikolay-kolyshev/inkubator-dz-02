export const settings = {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    databaseUrl: process.env.DATABASE_URL || 'localhost',
    port: process.env.PORT || 3500,
    mailTransport: {
        host: process.env.MAIL_TRANSPORT_HOST || '',
        port: Number.parseInt(process.env.MAIL_TRANSPORT_PORT ?? ''),
        user: process.env.MAIL_TRANSPORT_USER || '',
        password: process.env.MAIL_TRANSPORT_PASSWORD || '',
    },
};
