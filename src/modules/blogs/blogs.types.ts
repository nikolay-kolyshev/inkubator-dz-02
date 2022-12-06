import { Nullable } from '../../common/types';

export type BlogsQueryPaginationTerms = {
    searchNameTerm?: Nullable<string>;
    sortBy: string;
    sortDirection: string;
    pageSize: number;
    pageNumber: number;
};

export type PostsQueryByBlogIdPaginationTerms = {
    sortBy: string;
    sortDirection: string;
    pageSize: number;
    pageNumber: number;
};
