import { generateId } from '../../common/utils/generateId';
import { MailManager } from '../../managers/mail.manager';
import { UsersQueryRepository } from '../users/users.query-repository';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { AuthRegistrationInputDto } from './auth.dto';

export class AuthService {
    static async registration(dto: AuthRegistrationInputDto): Promise<Nullable<boolean>> {
        const userId = await UsersService.create({
            login: dto.login,
            email: dto.email,
            password: dto.password,
        });
        if (!userId) {
            return null;
        }
        const foundUser = await UsersQueryRepository.findUserSchemaById(userId);
        if (!foundUser) {
            return null;
        }
        const emailSendingResult = await MailManager.sendRegistrationConfirmationMessage(
            dto.email,
            foundUser.emailConfirmationCode,
        );
        if (emailSendingResult === null) {
            await UsersService.deleteById(userId);
            return null;
        }
        return true;
    }

    static async registrationConfirmation(code: string): Promise<Nullable<boolean>> {
        const foundUser = await UsersQueryRepository.findUserSchemaByConfirmationCode(code);
        if (!foundUser) {
            return null;
        }
        if (foundUser.emailConfirmationCode !== code) {
            return null;
        }
        const userEmailConfirmationResult = await UsersService.confirmUserEmailByUserId(foundUser.id);
        if (userEmailConfirmationResult === null) {
            return null;
        }
        return true;
    }

    static async registrationEmailResending(email: string): Promise<Nullable<boolean>> {
        const foundUser = await UsersQueryRepository.findUserSchemaByEmail(email);
        if (!foundUser) {
            return null;
        }
        const newCode = generateId();
        const emailSendingResult = await MailManager.sendRegistrationConfirmationMessage(email, newCode);
        if (emailSendingResult === null) {
            return null;
        }
        const updateUserConfirmationCodeResult = await UsersRepository.updateUserConfirmationCodeByUserId(
            newCode,
            foundUser.id,
        );
        if (!updateUserConfirmationCodeResult) {
            return null;
        }
        return true;
    }
}
