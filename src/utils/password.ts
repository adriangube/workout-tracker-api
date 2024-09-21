import bcrypt from 'bcrypt';
import { config } from '@config/index';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = config.SALT_ROUNDS;
    return await bcrypt.hash(password, saltRounds);
};