import { Collection, Document, Filter, WithId } from 'mongodb';

export const getCollectionItemsWithPagination = async <Scheme extends Document = Document>(
    collection: Collection<Scheme>,
    paginationConfig: {
        filter: Filter<Scheme>;
        sortBy: string;
        sortDirection: string;
        pageSize: number;
        pageNumber: number;
    },
): Promise<Array<WithId<Scheme>>> => {
    return await collection
        .find(paginationConfig.filter, { projection: { _id: false } })
        .sort({ [paginationConfig.sortBy]: paginationConfig.sortDirection === 'asc' ? 1 : -1 })
        .skip((paginationConfig.pageNumber - 1) * paginationConfig.pageSize)
        .limit((paginationConfig.pageSize = 10))
        .toArray();
};
