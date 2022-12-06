import { BlogEntity } from './blogs.entities';

export type BlogPaginationView = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: Array<BlogEntity>;
};
