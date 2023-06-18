import { WithId } from 'mongodb';
import { UserSchema } from '../users/users.schemes';

export type CommentsSchemaDefault = {
    id: string;
    content: string;
    commentator: UserSchema;
    postId: string;
    createdAt: string;
};

export type CommentsSchema = WithId<CommentsSchemaDefault>;
