import { Filter } from 'mongodb';
import { Nullable } from '../../common/types';
import { getCollectionItemsWithPagination } from '../../common/utils/getCollectionItemsWithPagination';
import { postsCollection } from '../../database/collections';
import { PostsQueryRepositoryDTO } from './posts.dto';
import { PostEntity } from './posts.entities';
import { PostScheme, PostSchemeDefault } from './posts.schemes';
import { PostPaginationView } from './posts.view';

export class PostsQueryRepository {
    static async findAllPosts({
        sortBy = 'createdAt',
        sortDirection = 'esc',
        pageSize = 10,
        pageNumber = 1,
        blogId,
    }: PostsQueryRepositoryDTO): Promise<PostPaginationView> {
        const filter: Filter<PostScheme> = {};

        console.log(sortBy, sortDirection, pageSize, pageNumber, blogId);

        if (blogId) {
            filter.blogId = { $regex: blogId };
        }

        const items: Array<PostEntity> = await getCollectionItemsWithPagination<PostSchemeDefault>(postsCollection, {
            filter,
            sortBy,
            sortDirection,
            pageSize,
            pageNumber,
        });

        const totalCount = await postsCollection.count(filter);
        const pagesCount = Math.ceil(totalCount / pageSize);

        return {
            pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount,
            items,
        };
    }
    static async findPostById(id: string): Promise<Nullable<PostEntity>> {
        return await postsCollection.findOne({ id }, { projection: { _id: false } });
    }
}
