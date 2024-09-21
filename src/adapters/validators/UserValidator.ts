import { User, UserWithPassword } from '@domain/entities/user';
import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string().uuid().optional(),
    username: z.string()
        .min(1, 'Username is required')
        .max(255, 'Username is too long. Maximum of 255 characters'),
    email: z.string().email()
        .min(1, 'Email is required')
        .max(255, 'Email is too long. Maximum of 255 characters'),
})

export const UserWithPasswordSchema = UserSchema.extend({
    password: z.string()
        .min(1, 'Password is required')
        .max(255, 'Password is too long. Maximum of 255 characters')
});

export const userValidator = async (user: User) => await UserSchema.safeParseAsync(user);
export const userWithPasswordValidator = async (user: UserWithPassword) => UserWithPasswordSchema.safeParseAsync(user);

export const userWithPasswordPartialValidator = async (user: Partial<UserWithPassword>) => UserWithPasswordSchema.partial().safeParseAsync(user)