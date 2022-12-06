import { BlogScheme } from './blogs.schemes';
import { BlogPaginationView } from './blogs.view';

type MapBlogsSchemesToBlogsPaginationViewProps = {
    blogs: Array<BlogScheme>;
    page: number;
    pageSize: number;
    totalCount: number;
    pagesCount: number;
};

export const mapBlogsSchemesToBlogsPaginationView = ({
    blogs,
    page,
    pageSize,
    totalCount,
    pagesCount,
}: MapBlogsSchemesToBlogsPaginationViewProps): BlogPaginationView => {
    return {
        pagesCount,
        page,
        pageSize,
        totalCount,
        items: blogs.map((blog) => ({
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
        })),
    };
};
