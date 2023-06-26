import { WithId } from 'mongodb';

export type UserSchemaDefault = {
    id: string;
    login: string;
    email: string;
    createdAt: string;
    passwordHash: string;
    passwordSalt: string;
    isEmailConfirmed: boolean;
};

export type UserSchema = WithId<UserSchemaDefault>;
