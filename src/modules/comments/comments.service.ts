import { generateDate } from '../../common/utils/generateDate';
import { generateId } from '../../common/utils/generateId';
import { UserSchema } from '../users/users.schemes';
import { CommentsInputDto } from './comments.dto';
import { CommentEntity } from './comments.entities';
import { CommentsQueryRepository } from './comments.query-repository';
import { CommentsRepository } from './comments.repository';

export class CommentsService {
    static async getById(id: string) {
        const foundedComment = await CommentsQueryRepository.findCommentEntityById(id);
        if (!foundedComment) {
            return null;
        }
        return foundedComment;
    }

    static async create(
        dto: CommentsInputDto,
        commentator: UserSchema,
        postId: string,
    ): Promise<Nullable<CommentEntity>> {
        const id = generateId();
        try {
            await CommentsRepository.create({
                id,
                createdAt: generateDate(),
                content: dto.content,
                commentator,
                postId,
            });
            return await CommentsQueryRepository.findCommentEntityById(id);
        } catch (err) {
            return null;
        }
    }

    static async updateById(id: string, dto: CommentsInputDto): Promise<boolean> {
        return await CommentsRepository.updateById(id, dto);
    }

    static async deleteById(id: string): Promise<boolean> {
        return await CommentsRepository.deleteById(id);
    }
}
