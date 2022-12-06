export type PostsInputDTO = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
};

export type PostsInputRepositoryDTO = PostsInputDTO & {
    id: string;
    createdAt: string;
    blogName: string;
};

export type PostsQueryRepositoryDTO = {
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortDirection: string;
    blogId?: string;
};
