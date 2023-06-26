import { MailAdapter } from '../adapters/mail.adapter';

export class MailManager {
    static async sendRegistrationConfirmationMessage(to: string, confirmationCode: string): Promise<Nullable<string>> {
        try {
            return await MailAdapter.sendMessage(
                to,
                'Подтверждение регистрации',
                `
                <h1>Thank for your registration</h1>
                 <p>To finish registration please follow the link below:
                     <a href="https://somesite.com/confirm-email?code=${confirmationCode}">complete registration</a>
                 </p>
                `,
            );
        } catch (err) {
            console.error('[sendRegistrationConfirmationMessage]', err);
            return null;
        }
    }
}
