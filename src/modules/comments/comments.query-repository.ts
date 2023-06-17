import { commentsCollection } from '../../database/collections';
import { CommentsEntity } from './comments.entities';
import { CommentsSchema } from './comments.schemas';

export class CommentsQueryRepository {
    static async findCommentEntityById(id: string): Promise<Nullable<CommentsEntity>> {
        const comment = await commentsCollection.findOne<CommentsSchema>({
            id: id,
        });
        if (!comment) {
            return null;
        }
        return {
            id: comment.id,
            content: comment.content,
            commentatorInfo: {
                userId: comment.commentator.id,
                userLogin: comment.commentator.login,
            },
            createdAt: comment.createdAt,
        };
    }
}
