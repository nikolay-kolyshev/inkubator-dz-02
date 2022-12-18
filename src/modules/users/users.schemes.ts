import { WithId } from 'mongodb';

export type UserSchemaDefault = {
    id: string;
    login: string;
    email: string;
    createdAt: string;
    passwordHash: string;
    passwordSalt: string;
};

export type UserSchema = WithId<UserSchemaDefault>;
