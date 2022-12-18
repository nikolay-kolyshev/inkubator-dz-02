import { generateDate } from '../../common/utils/generateDate';
import { generateId } from '../../common/utils/generateId';
import { HashingUtils } from '../../common/utils/HashingUtils';
import { UsersCheckCredentialsDto, UsersCreateUserServiceDTO } from './users.dto';
import { UsersQueryRepository } from './users.query-repository';
import { UsersRepository } from './users.repository';

export class UsersService {
    static async checkCredentials(dto: UsersCheckCredentialsDto): Promise<boolean> {
        const foundedUser = await UsersQueryRepository.findUserSchemaByLoginOrEmail(dto.loginOrEmail);
        if (!foundedUser) {
            return false;
        }
        const generatePasswordHash = await HashingUtils.generateHash(dto.password, foundedUser.passwordSalt);
        return generatePasswordHash === foundedUser.passwordHash;
    }

    static async createUser(dto: UsersCreateUserServiceDTO): Promise<boolean> {
        const id = generateId();
        const createdAt = generateDate();
        const passwordSalt = await HashingUtils.generateSalt();
        const passwordHash = await HashingUtils.generateHash(dto.password, passwordSalt);
        return await UsersRepository.createUser({
            id,
            email: dto.email,
            login: dto.login,
            createdAt,
            passwordHash,
            passwordSalt,
        });
    }

    static async deleteUserById(id: string): Promise<boolean> {
        return await UsersRepository.deleteUserById(id);
    }
}
