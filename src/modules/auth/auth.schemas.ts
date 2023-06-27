import { WithId } from 'mongodb';

export type BannedTokenSchemaDefault = {
    value: string;
};

export type ExpiredTokenSchema = WithId<BannedTokenSchemaDefault>;
