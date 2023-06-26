import { MailManager } from '../../managers/mail.manager';
import { UsersQueryRepository } from '../users/users.query-repository';
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
        const emailSendingResult = await MailManager.sendRegistrationConfirmationMessage(dto.email, userId);
        if (emailSendingResult === null) {
            await UsersService.deleteById(userId);
            return null;
        }
        return true;
    }

    static async registrationConfirmation(code: string): Promise<Nullable<boolean>> {
        const foundUser = await UsersService.getById(code);
        if (!foundUser) {
            return null;
        }
        if (foundUser.id !== code) {
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
        const emailSendingResult = await MailManager.sendRegistrationConfirmationMessage(email, foundUser.id);
        if (emailSendingResult === null) {
            return null;
        }
        return true;
    }
}
