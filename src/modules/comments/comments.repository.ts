import { commentsCollection, usersCollection } from '../../database/collections';
import { CommentsInputDto, CommentsInputRepositoryDto } from './comments.dto';

export class CommentsRepository {
    static async create(comment: CommentsInputRepositoryDto): Promise<void> {
        await commentsCollection.insertOne(comment);
    }

    static async updateById(id: string, dto: CommentsInputDto): Promise<boolean> {
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
        } catch (error) {
            console.error('comments update failed', `\n`, error);
            return false;
        }
    }

    static async deleteById(id: string): Promise<boolean> {
        return (await usersCollection.deleteOne({ id })).acknowledged;
    }
}
