import jwt from 'jsonwebtoken';
import { UserEntity } from '../../modules/users/users.entities';
import { settings } from '../../settings';

export class JwtService {
    static async createJwt(user: UserEntity): Promise<string> {
        return jwt.sign({ userId: user.id }, settings.jwtSecret, { expiresIn: '1000000h' });
    }
    static async getUserIdFromJwt(token: string): Promise<Nullable<string>> {
        try {
            const { userId } = (await jwt.verify(token, settings.jwtSecret)) as { userId: string };
            return userId;
        } catch (error) {
            return null;
        }
    }
}
