export type PostsInputDTO = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
};

export type PostsInputRepositoryDTO = PostsInputDTO & {
    id: string;
    createdAt: string;
};

export type PostsQueryRepositoryDTO = {
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortDirection: string;
    blogId?: string;
};
