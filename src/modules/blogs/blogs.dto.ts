import { Nullable } from '../../common/types';

export type BlogsInputDTO = {
    name: string;
    description: string;
    websiteUrl: string;
};

export type BlogsInputRepositoryDTO = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
};

export type BlogsQueryRepositoryDTO = {
    searchNameTerm?: Nullable<string>;
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortDirection: string;
};
