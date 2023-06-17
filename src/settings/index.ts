export const settings = {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    databaseUrl: process.env.DATABASE_URL || 'secret',
    port: process.env.PORT || 3500,
};
