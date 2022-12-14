import { WithId } from 'mongodb';

export type PostSchemeDefault = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
};

export type PostScheme = WithId<PostSchemeDefault>;
