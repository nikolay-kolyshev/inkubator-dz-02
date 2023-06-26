import { generateDate } from '../../common/utils/generateDate';
import { generateId } from '../../common/utils/generateId';
import { HashingUtils } from '../../common/utils/HashingUtils';
import { UsersCheckCredentialsDto, UsersCreateUserServiceDTO } from './users.dto';
import { UserEntity } from './users.entities';
import { UsersQueryRepository } from './users.query-repository';
import { UsersRepository } from './users.repository';

export class UsersService {
    static async getById(id: string) {
        const foundedUser = await UsersQueryRepository.findUserSchemaById(id);
        if (!foundedUser) {
            return null;
        }
        return foundedUser;
    }

    static async checkCredentials(dto: UsersCheckCredentialsDto): Promise<Nullable<UserEntity>> {
        const foundedUser = await UsersQueryRepository.findUserSchemaByLoginOrEmail(dto.loginOrEmail);
        if (!foundedUser) {
            return null;
        }
        const generatePasswordHash = await HashingUtils.generateHash(dto.password, foundedUser.passwordSalt);
        return generatePasswordHash === foundedUser.passwordHash ? foundedUser : null;
    }

    /**
     * @return {string} userId
     */
    static async create(dto: UsersCreateUserServiceDTO): Promise<Nullable<string>> {
        const id = generateId();
        const createdAt = generateDate();
        const emailConfirmationCode = generateId();
        const passwordSalt = await HashingUtils.generateSalt();
        const passwordHash = await HashingUtils.generateHash(dto.password, passwordSalt);
        const userCreationResult = await UsersRepository.createUser({
            id,
            email: dto.email,
            login: dto.login,
            createdAt,
            passwordHash,
            passwordSalt,
            isEmailConfirmed: false,
            emailConfirmationCode,
        });
        if (!userCreationResult) {
            return null;
        }
        return id;
    }

    static async confirmUserEmailByUserId(id: string): Promise<Nullable<boolean>> {
        return await UsersRepository.confirmUserEmailByUserId(id);
    }

    static async deleteById(id: string): Promise<boolean> {
        return await UsersRepository.deleteUserById(id);
    }
}
