import { usersCollection } from '../../database/collections';
import { UsersCreateUserRepositoryDTO } from './users.dto';

export class UsersRepository {
    static async createUser(dto: UsersCreateUserRepositoryDTO): Promise<boolean> {
        const insertRes = await usersCollection.insertOne(dto);
        return insertRes.acknowledged;
    }
    static async deleteUserById(id: string): Promise<boolean> {
        return (await usersCollection.deleteOne({ id })).acknowledged;
    }
}
