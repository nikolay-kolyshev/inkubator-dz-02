import { Request, Response } from 'express';
import { STATUS_CODES } from '../../common/constants';
import { usersCollection } from '../../database/collections';
import { UsersCreateUserServiceDTO } from './users.dto';
import { UserEntity } from './users.entities';
import { UsersQueryRepository } from './users.query-repository';
import { UsersService } from './users.service';
import { UsersQueryPaginationTerms } from './users.types';
import { UserPaginationView } from './users.view';

export class UsersController {
    static async getUsers(
        req: Request<{}, {}, {}, UsersQueryPaginationTerms>,
        res: Response<UserPaginationView>,
    ): Promise<void> {
        const { searchEmailTerm, searchLoginTerm, sortBy, sortDirection, pageSize, pageNumber } = req.query;
        const foundUsers = await UsersQueryRepository.findUsers({
            searchEmailTerm,
            searchLoginTerm,
            sortBy,
            sortDirection,
            pageSize: pageSize ? +pageSize : 10,
            pageNumber: +pageNumber ? +pageNumber : 1,
        });
        res.status(STATUS_CODES.OK).send(foundUsers);
        return;
    }

    static async postUser(
        req: Request<{}, UserEntity, UsersCreateUserServiceDTO>,
        res: Response<UserEntity>,
    ): Promise<void> {
        const { login, password, email } = req.body;
        const isCreatedUser = await UsersService.createUser({
            login,
            email,
            password,
        });
        if (isCreatedUser) {
            const user = await UsersQueryRepository.findUserByLoginOrEmail(login);
            if (!user) {
                res.sendStatus(STATUS_CODES.INTERNAL_SERVER_ERROR);
                return;
            }
            res.status(STATUS_CODES.CREATED).send(user);
            return;
        }
        res.sendStatus(STATUS_CODES.INTERNAL_SERVER_ERROR);
        return;
    }

    static async deleteUserById(req: Request<{ id: string }>, res: Response<UserEntity>) {
        const id = req.params.id;
        const foundUser = await UsersQueryRepository.findUserById(id);
        if (!foundUser) {
            res.status(STATUS_CODES.NOT_FOUND);
            return;
        }
        const isUserDeleted = await UsersService.deleteUserById(req.params.id);
        if (isUserDeleted) {
            res.status(STATUS_CODES.NO_CONTENT);
            return;
        }
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
        return;
    }

    static async deleteAllUsers(): Promise<void> {
        await usersCollection.deleteMany({});
    }
}
