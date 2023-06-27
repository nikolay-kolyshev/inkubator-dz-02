import jwt from 'jsonwebtoken';
import { UserEntity } from '../../modules/users/users.entities';
import { settings } from '../../settings';

export class JwtService {
    static async createAccessJwtToken(user: UserEntity): Promise<string> {
        return this.createJwtToken(user, '10d');
    }
    static async createRefreshJwtToken(user: UserEntity): Promise<string> {
        return this.createJwtToken(user, '20d');
    }
    static async getUserIdFromJwt(token: string): Promise<Nullable<string>> {
        try {
            const { userId } = (await jwt.verify(token, settings.jwtSecret)) as { userId: string };
            return userId;
        } catch (error) {
            console.error('[JwtService]', error);
            return null;
        }
    }
    static async createJwtToken(user: UserEntity, expiresIn: string) {
        return jwt.sign({ userId: user.id }, settings.jwtSecret, { expiresIn });
    }
}
