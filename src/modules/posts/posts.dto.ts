export type PostsInputDTO = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
};

export type PostsInputRepositoryDTO = PostsInputDTO & {
    id: string;
    blogName: string;
};
