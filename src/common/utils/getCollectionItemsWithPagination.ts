import { Collection, Document, Filter, WithId } from 'mongodb';

export const getCollectionItemsWithPagination = async <Scheme extends Document = Document>(
    collection: Collection<Scheme>,
    paginationConfig: {
        filter?: Filter<Scheme>;
        sortBy?: string;
        sortDirection?: string;
        pageSize?: number;
        pageNumber?: number;
    },
): Promise<Array<WithId<Scheme>>> => {
    const {
        filter = {},
        sortBy = 'createdAt',
        sortDirection = 'asc',
        pageSize = 10,
        pageNumber = 1,
    } = paginationConfig;
    return await collection
        .find(filter, { projection: { _id: false } })
        .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .toArray();
};
