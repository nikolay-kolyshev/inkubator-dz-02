import { UserSchema } from '../users/users.schemes';

export type CommentsInputDto = {
    content: string;
};

export type CommentsInputRepositoryDto = CommentsInputDto & {
    id: string;
    commentator: UserSchema;
    postId: string;
    createdAt: string;
};

export type CommentsQueryRepositoryDTO = {
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortDirection: string;
    postId?: string;
};
