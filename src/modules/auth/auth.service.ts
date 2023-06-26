import { generateId } from '../../common/utils/generateId';
import { MailManager } from '../../managers/mail.manager';
import { UsersService } from '../users/users.service';
import { AuthRegistrationInputDto } from './auth.dto';

export class AuthService {
    static async registration(dto: AuthRegistrationInputDto): Promise<Nullable<boolean>> {
        const emailConfirmationCode = generateId();
        const userId = await UsersService.create({
            login: dto.login,
            email: dto.email,
            password: dto.password,
            emailConfirmationCode,
        });
        if (!userId) {
            return null;
        }
        const emailSendingResult = await MailManager.sendRegistrationConfirmationMessage(
            dto.email,
            emailConfirmationCode,
        );
        if (emailSendingResult === null) {
            await UsersService.deleteById(userId);
            return null;
        }
        return true;
    }

    static async registrationConfirmation(code: string, userId: string): Promise<Nullable<boolean>> {
        const foundUser = await UsersService.getById(userId);
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

    static async registrationEmailResendingByUserId(email: string, userId: string): Promise<Nullable<boolean>> {
        const foundUser = await UsersService.getById(userId);
        if (!foundUser) {
            return null;
        }
        const emailSendingResult = await MailManager.sendRegistrationConfirmationMessage(
            email,
            foundUser.emailConfirmationCode,
        );
        if (emailSendingResult === null) {
            return null;
        }
        return true;
    }
}
