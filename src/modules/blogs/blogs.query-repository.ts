import { Filter } from 'mongodb';
import { getCollectionItemsWithPagination } from '../../common/utils/getCollectionItemsWithPagination';
import { blogsCollection } from '../../database/collections';
import { BlogsQueryRepositoryDTO } from './blogs.dto';
import { BlogEntity } from './blogs.entities';
import { BlogScheme, BlogSchemeDefault } from './blogs.schemes';
import { BlogPaginationView } from './blogs.view';

export class BlogsQueryRepository {
    static async findAllBlogs({
        searchNameTerm,
        sortBy = 'createdAt',
        sortDirection = 'esc',
        pageSize = 10,
        pageNumber = 1,
    }: BlogsQueryRepositoryDTO): Promise<BlogPaginationView> {
        const filter: Filter<BlogScheme> = {};

        if (searchNameTerm) {
            filter.name = { $regex: new RegExp(searchNameTerm, 'i') };
        }

        const items: Array<BlogScheme> = await getCollectionItemsWithPagination<BlogSchemeDefault>(blogsCollection, {
            filter,
            sortBy,
            sortDirection,
            pageSize,
            pageNumber,
        });

        const totalCount = await blogsCollection.count(filter);
        const pagesCount = Math.ceil(totalCount / pageSize);

        return {
            pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount,
            items,
        };
    }
    static async findBlogById(id: string): Promise<Nullable<BlogEntity>> {
        return await blogsCollection.findOne({ id }, { projection: { _id: false } });
    }
}
