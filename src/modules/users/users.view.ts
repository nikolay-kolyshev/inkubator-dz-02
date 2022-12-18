import { UserEntity } from './users.entities';

export type UserPaginationView = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: Array<UserEntity>;
};
