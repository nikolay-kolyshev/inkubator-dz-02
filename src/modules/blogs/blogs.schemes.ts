import { WithId } from 'mongodb';

export type BlogSchemeDefault = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
};

export type BlogScheme = WithId<BlogSchemeDefault>;
