export type PostsInputDTO = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
};

export type PostsInputRepositoryDTO = PostsInputDTO & {
    id: string;
    blogName: string;
    createdAt: string;
};

export type PostsQueryRepositoryDTO = {
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortDirection: string;
    blogId?: string;
};
