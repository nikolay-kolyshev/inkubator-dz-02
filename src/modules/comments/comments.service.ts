import { CommentsQueryRepository } from './comments.query-repository';
import { CommentsRepository } from './comments.repository';
import {CommentsPutCommentByIdDto} from "./comments.dto";

export class CommentsService {
    static async getById(id: string) {
        const foundedComment = await CommentsQueryRepository.findCommentEntityById(id);
        if (!foundedComment) {
            return null;
        }
        return foundedComment;
    }

    static async updateById(id: string, dto: CommentsPutCommentByIdDto): Promise<boolean> {
        return await CommentsRepository.updateCommentById(id, dto);
    }

    static async deleteById(id: string): Promise<boolean> {
        return await CommentsRepository.deleteCommentById(id);
    }
}
