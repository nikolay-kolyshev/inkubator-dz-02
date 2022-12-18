import { Filter, FilterOperators } from 'mongodb';
import { Nullable } from '../../common/types';
import { getCollectionItemsWithPagination } from '../../common/utils/getCollectionItemsWithPagination';
import { usersCollection } from '../../database/collections';
import { UsersQueryRepositoryGetUsersDTO } from './users.dto';
import { UserEntity } from './users.entities';
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
        const filter: Filter<UserSchemaDefault> & FilterOperators<UserSchemaDefault> = {};

        if (searchLoginTerm && searchEmailTerm) {
            filter.$or = [
                { login: { $regex: searchLoginTerm, $options: 'i' } },
                { email: { $regex: searchEmailTerm, $options: 'i' } },
            ];
        } else if (searchLoginTerm) {
            filter.login = { $regex: searchLoginTerm };
        } else if (searchEmailTerm) {
            filter.email = { $regex: searchEmailTerm };
        }

        const usersSchemes: Array<UserSchema> = await getCollectionItemsWithPagination<UserSchemaDefault>(
            usersCollection,
            {
                filter,
                sortBy,
                sortDirection,
                pageSize,
                pageNumber,
            },
        );

        let items: Array<UserEntity> = [];

        if (Boolean(usersSchemes) && usersSchemes.length) {
            items = usersSchemes.map((item) => ({
                id: item.id,
                login: item.login,
                email: item.email,
                createdAt: item.createdAt,
            }));
        }

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
    static async findUserSchemaByLoginOrEmail(loginOrEmail: string): Promise<Nullable<UserSchema>> {
        return await usersCollection.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] });
    }

    static async findUserEntityByLoginOrEmail(loginOrEmail: string): Promise<Nullable<UserEntity>> {
        const user = await UsersQueryRepository.findUserSchemaByLoginOrEmail(loginOrEmail);
        if (!user) {
            return null;
        }
        return {
            id: user.id,
            login: user.login,
            email: user.email,
            createdAt: user.createdAt,
        };
    }

    static async findUserSchemaById(id: string): Promise<Nullable<UserSchema>> {
        return await usersCollection.findOne({ id });
    }

    static async findUserEntityById(id: string): Promise<Nullable<UserEntity>> {
        const user = await UsersQueryRepository.findUserSchemaById(id);
        if (!user) {
            return null;
        }
        return {
            id: user.id,
            login: user.login,
            email: user.email,
            createdAt: user.createdAt,
        };
    }
}
