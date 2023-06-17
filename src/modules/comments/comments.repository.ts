import { commentsCollection, usersCollection } from '../../database/collections';
import { CommentsPutCommentByIdDto } from './comments.dto';

export class CommentsRepository {
    static async updateCommentById(id: string, dto: CommentsPutCommentByIdDto): Promise<boolean> {
        try {
            const updateResult = await commentsCollection.updateOne(
                {
                    id,
                },
                {
                    $set: {
                        content: dto.content,
                    },
                },
            );
            return updateResult.acknowledged;
        } catch (_) {
            return false;
        }
    }

    static async deleteCommentById(id: string): Promise<boolean> {
        return (await usersCollection.deleteOne({ id })).acknowledged;
    }
}
