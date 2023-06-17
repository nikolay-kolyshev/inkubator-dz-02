import { MongoClient } from 'mongodb';

import '../environment';
import { settings } from '../settings';

if (!settings.databaseUrl) {
    throw new Error('DATABASE_URL must be defined');
}

export const databaseClient = new MongoClient(settings.databaseUrl);

export const runDatabase = async () => {
    try {
        await databaseClient.connect();
        console.log('👌Connected to database');
    } catch (error) {
        console.log('👎Error connecting to database', error);
    }
};
