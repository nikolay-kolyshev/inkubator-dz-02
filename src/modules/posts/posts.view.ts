import { PostEntity } from './posts.entities';

export type PostPaginationView = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: Array<PostEntity>;
};
