import { Nullable } from '../../common/types';

export type UsersQueryPaginationTerms = {
    searchLoginTerm?: Nullable<string>;
    searchEmailTerm?: Nullable<string>;
    sortBy: string;
    sortDirection: string;
    pageSize: number;
    pageNumber: number;
};
