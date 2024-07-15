import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z
        .string({
            required_error: 'Email can not empty',
        })
        .email({
            message: 'Invalid email',
        }),
    password: z
        .string({
            required_error: 'Password can not empty',
        })
        .min(6, { message: 'Password must be at least 6 characters' }),
});

export const registerFormSchema = z.object({
    fullName: z
        .string({ required_error: 'Full name can not empty' })
        .min(3, { message: 'Full name must be at least 3 characters' })
        .max(50, { message: 'Full name must be maximum 50 characters' }),
    username: z
        .string({ required_error: 'Username can not empty' })
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(20, { message: 'Username must be maximum 50 characters' }),
    email: z
        .string({ required_error: 'Email can not empty' })
        .email({ message: 'Email must be a valid email' }),
    phoneNumber: z
        .string()
        .min(10, { message: 'Phone number must be at least 10 characters' })
        .optional()
        .or(z.literal(''))
        .transform((e) => (e === '' ? undefined : e)),
    password: z
        .string({ required_error: 'Password can not empty' })
        .min(8, { message: 'Password must be at least 6 characters' })
        .refine((password) => /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password), {
            message: 'Password must contain at least one letter and one number',
        }),
});

export const createGroupFormSchema = z.object({
    title: z
        .string({ required_error: 'Group name can not empty' })
        .min(3, { message: 'Group name must be at least 3 characters' })
        .max(50, { message: 'Group name must be maximum 50 characters' }),
    description: z
        .string()
        .optional()
        .or(z.literal(''))
        .transform((e) => (e === '' ? undefined : e)),
});

export const createAlbumFormSchema = z.object({
    title: z
        .string({ required_error: 'Album name can not empty' })
        .min(3, { message: 'Album name must be at least 3 characters' })
        .max(50, { message: 'Album name must be maximum 50 characters' }),
    description: z
        .string()
        .optional()
        .or(z.literal(''))
        .transform((e) => (e === '' ? undefined : e)),
});

export const joinGroupSchema = z.object({
    code: z.string().min(6, {
        message: 'Group code must be 6 characters.',
    }),
});

export const uploadPhotoSchema = z.object({
    title: z
        .string({ required_error: 'Title can not empty' })
        .min(3, {
            message: 'Title must be at least 3 characters',
        })
        .max(50, {
            message: 'Title must be maximum 50 characters',
        }),
    url: z.any({
        required_error: 'Image can not empty',
    }),
    tags: z
        .array(
            z
                .string()
                .min(1, { message: 'Tag can not empty' })
                .max(20, { message: 'Tag must be maximum 15 characters' })
        )
        .max(5, { message: 'Number of tags can not greater than 5' })
        .refine((items) => new Set(items).size === items.length, {
            message: 'Tag must be unique',
        }),
});

export const editPhotoSchema = z.object({
    title: z
        .string({ required_error: 'Title can not empty' })
        .min(3, {
            message: 'Title must be at least 3 characters',
        })
        .max(50, {
            message: 'Title must be maximum 50 characters',
        }),
    tags: z
        .array(
            z.object({
                value: z
                    .string()
                    .min(1, { message: 'Tag can not empty' })
                    .max(20, { message: 'Tag must be maximum 15 characters' }),
            })
        )
        .max(5, { message: 'Number of tags can not greater than 5' })
        .refine((items) => new Set(items).size === items.length, {
            message: 'Tag must be unique',
        })
        .optional(),
});

export const photoCommentSchema = z.object({
    content: z
        .string()
        .refine((val) => val.replace(/<[^>]+>/g, '').trim().length >= 1, {
            message: 'Comment can not empty',
        })
        .refine((val) => val.replace(/<[^>]+>/g, '').trim().length <= 200, {
            message: 'Comment must be less than 200 characters',
        }),
});

export const modifyGroupFormSchema = z.object({
    title: z
        .string({ required_error: 'Group name can not empty' })
        .min(3, { message: 'Group name must be at least 3 characters' })
        .max(50, { message: 'Group name must be maximum 50 characters' }),
    description: z
        .string()
        .optional()
        .or(z.literal(''))
        .transform((e) => (e === '' ? undefined : e)),
    groupImg: z.any({
        required_error: 'Image can not empty',
    }),
});
