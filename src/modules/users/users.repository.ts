import { usersCollection } from '../../database/collections';
import { UsersCreateUserRepositoryDTO } from './users.dto';

export class UsersRepository {
    static async createUser(dto: UsersCreateUserRepositoryDTO): Promise<boolean> {
        const insertRes = await usersCollection.insertOne(dto);
        return insertRes.acknowledged;
    }
    static async updateUserConfirmationCodeByUserId(code: string, userId: string): Promise<boolean> {
        const updateRes = await usersCollection.updateOne(
            {
                id: userId,
            },
            {
                $set: { emailConfirmationCode: code },
            },
        );
        return updateRes.acknowledged;
    }
    static async confirmUserEmailByUserId(id: string): Promise<boolean> {
        const updateRes = await usersCollection.updateOne(
            {
                id,
            },
            {
                $set: { isEmailConfirmed: true },
            },
        );
        return updateRes.acknowledged;
    }
    static async deleteUserById(id: string): Promise<boolean> {
        return (await usersCollection.deleteOne({ id })).acknowledged;
    }
}
