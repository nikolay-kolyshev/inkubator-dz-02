export const settings = {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    databaseUrl: process.env.DATABASE_URL || 'localhost',
    port: process.env.PORT || 3500,
};
