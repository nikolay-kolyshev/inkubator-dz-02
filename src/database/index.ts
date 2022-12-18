import { MongoClient } from 'mongodb';

import '../environment';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL must be defined');
}

export const databaseClient = new MongoClient(databaseUrl);

export const runDatabase = async () => {
    try {
        await databaseClient.connect();
        console.log('👌Connected to database');
    } catch (error) {
        console.log('👎Error connecting to database', error);
    }
};
