import { MongoClient } from 'mongodb';
import { settings } from '../settings';

if (!settings.databaseUrl) {
    throw new Error('DATABASE_URL must be defined');
}

export const databaseClient = new MongoClient(settings.databaseUrl);

export const runDatabase = async () => {
    try {
        await databaseClient.connect();
        console.info('👌Connected to database');
    } catch (error) {
        console.info('👎Error connecting to database', error);
    }
};
