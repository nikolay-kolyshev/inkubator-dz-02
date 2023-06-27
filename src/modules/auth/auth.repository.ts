import { bannedTokensCollection } from '../../database/collections';

export class AuthRepository {
    static async addRefreshTokenToBannedJwtTokens(token: string): Promise<boolean> {
        const insertRes = await bannedTokensCollection.insertOne({
            value: token,
        });
        return insertRes.acknowledged;
    }
    static async checkIsRefreshTokenBanned(token: string): Promise<boolean> {
        const foundBannedToken = await bannedTokensCollection.findOne({
            value: token,
        });
        return Boolean(foundBannedToken);
    }
}
