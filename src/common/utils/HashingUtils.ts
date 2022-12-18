import * as bcrypt from 'bcrypt';

export class HashingUtils {
    static async generateHash(inputString: string, salt?: string): Promise<string> {
        const hashSalt = salt ?? (await HashingUtils.generateSalt());
        return await bcrypt.hash(inputString, hashSalt);
    }
    static async generateSalt(rounds = 10): Promise<string> {
        return await bcrypt.genSalt(rounds);
    }
}
