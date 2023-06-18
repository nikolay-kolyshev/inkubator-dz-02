import { WithId } from 'mongodb';

export type BlogSchemeDefault = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    isMembership: false;
    createdAt: string;
};

export type BlogScheme = WithId<BlogSchemeDefault>;
