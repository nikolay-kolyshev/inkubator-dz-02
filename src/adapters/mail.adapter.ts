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
        const transporter = nodemailer.createTransport({
            host: settings.mailTransport.host,
            port: settings.mailTransport.port,
            secure: true,
            auth: {
                user: settings.mailTransport.user,
                pass: settings.mailTransport.password,
            },
        });

        await new Promise((resolve, reject) => {
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log('Сервер готов отправлять сообщения');
                    resolve(success);
                }
            });
        });

        const mailData = {
            from: {
                name: `Николай Колышев`,
                address: settings.mailTransport.user,
            },
            to,
            html: message,
        };

        try {
            return await new Promise((resolve, reject) => {
                transporter.sendMail(mailData, (err, info) => {
                    if (err) {
                        console.error(err);
                        reject(null);
                    } else {
                        resolve(info.messageId);
                    }
                });
            });
        } catch (error) {
            console.error('[MailAdapter.sendMessage]', error);
            return null;
        }
    }
}
