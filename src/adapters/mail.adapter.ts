import nodemailer from 'nodemailer';
import { settings } from '../settings';

export class MailAdapter {
    /**
     * @param to
     * @param subject
     * @param message
     * @returns {Promise<string>} messageId
     */
    static async sendMessage(to: string, subject: string, message: string): Promise<Nullable<string>> {
        const transport = nodemailer.createTransport({
            host: settings.mailTransport.host,
            port: settings.mailTransport.port,
            secure: true,
            auth: {
                user: settings.mailTransport.user,
                pass: settings.mailTransport.password,
            },
        });

        try {
            const info = await transport.sendMail({
                from: settings.mailTransport.user,
                to,
                subject,
                html: message,
            });
            return info.messageId;
        } catch (error) {
            console.error('[MailAdapter.sendMessage]', error);
            return null;
        }
    }
}
