import { Filter } from 'mongodb';
import { getCollectionItemsWithPagination } from '../../common/utils/getCollectionItemsWithPagination';
import { commentsCollection } from '../../database/collections';
import { CommentsQueryRepositoryDTO } from './comments.dto';
import { CommentEntity } from './comments.entities';
import { CommentsSchema, CommentsSchemaDefault } from './comments.schemas';
import { CommentsPaginationView } from './comments.view';

export class CommentsQueryRepository {
    static async findAllComments({
        sortBy = 'createdAt',
        sortDirection = 'esc',
        pageSize = 10,
        pageNumber = 1,
        postId,
    }: CommentsQueryRepositoryDTO): Promise<CommentsPaginationView> {
        const filter: Filter<CommentsSchema> = {};

        if (postId) {
            filter.postId = { $regex: postId };
        }

        const items: Array<CommentsSchema> = await getCollectionItemsWithPagination<CommentsSchemaDefault>(
            commentsCollection,
            {
                filter,
                sortBy,
                sortDirection,
                pageSize,
                pageNumber,
            },
        );

        const mappedItems: CommentEntity[] = items.map((item) => ({
            id: item.id,
            content: item.content,
            commentatorInfo: {
                userId: item.commentator.id,
                userLogin: item.commentator.login,
            },
            createdAt: item.createdAt,
        }));

        const totalCount = await commentsCollection.count(filter);
        const pagesCount = Math.ceil(totalCount / pageSize);

        return {
            pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount,
            items: mappedItems,
        };
    }

    static async findCommentEntityById(id: string): Promise<Nullable<CommentEntity>> {
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
