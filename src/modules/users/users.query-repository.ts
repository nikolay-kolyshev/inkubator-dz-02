import { Filter } from 'mongodb';
import { Nullable } from '../../common/types';
import { getCollectionItemsWithPagination } from '../../common/utils/getCollectionItemsWithPagination';
import { usersCollection } from '../../database/collections';
import { UsersQueryRepositoryGetUsersDTO } from './users.dto';
import { UserSchema, UserSchemaDefault } from './users.schemes';
import { UserPaginationView } from './users.view';

export class UsersQueryRepository {
    static async findUsers({
        sortBy = 'createdAt',
        sortDirection = 'esc',
        pageSize = 10,
        pageNumber = 1,
        searchLoginTerm,
        searchEmailTerm,
    }: UsersQueryRepositoryGetUsersDTO): Promise<UserPaginationView> {
        const filter: Filter<UserSchemaDefault> = {};

        if (searchLoginTerm) {
            filter.login = { $regex: searchLoginTerm };
        }

        if (searchEmailTerm) {
            filter.email = { $regex: searchEmailTerm };
        }

        const items: Array<UserSchema> = await getCollectionItemsWithPagination<UserSchemaDefault>(usersCollection, {
            filter,
            sortBy,
            sortDirection,
            pageSize,
            pageNumber,
        });

        const totalCount = await usersCollection.count(filter);
        const pagesCount = Math.ceil(totalCount / pageSize);

        return {
            pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount,
            items,
        };
    }
    static async findUserByLoginOrEmail(loginOrEmail: string): Promise<Nullable<UserSchema>> {
        return await usersCollection.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] });
    }

    static async findUserById(id: string): Promise<Nullable<UserSchema>> {
        return await usersCollection.findOne({ id });
    }
}
