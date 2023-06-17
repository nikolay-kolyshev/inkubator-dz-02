import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { UserEntity } from '../../modules/users/users.entities';
import { settings } from '../../settings';

export class JwtService {
    static async createJwt(user: UserEntity): Promise<string> {
        return jwt.sign({userId: user.id}, settings.jwtSecret, {expiresIn: '1h'});
    }
    static async getUserIdFromJwt(token: string): Promise<Nullable<ObjectId>> {
        try {
            const { userId } = await jwt.verify(token, settings.jwtSecret) as { userId: string };
            return new ObjectId(userId);
        } catch (error) {
            return null;
        }
    }
}
