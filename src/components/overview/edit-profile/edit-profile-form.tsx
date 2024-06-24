'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { editProfileFormSchema } from '@/lib/form-schema';
import { getUserInfor } from '@/lib/data';
import { useEffect, useState } from 'react';
import { editProfile } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function EditProfileForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<
        { error?: string; errorType?: string; isSuccess?: boolean } | undefined
    >(undefined);
    // const userInfo = await getUserInfor();

    const form = useForm<z.infer<typeof editProfileFormSchema>>({
        resolver: zodResolver(editProfileFormSchema),
        defaultValues: {
            username: '',
            fullName: '',
            phoneNumber: '',
            bio: '',
            img: '',
        },
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfor();
            form.setValue('username', userInfo.username);
            form.setValue('fullName', userInfo.fullName);
            form.setValue('phoneNumber', userInfo.phoneNumber);
            form.setValue('bio', userInfo.bio);
            form.setValue('img', userInfo.img);
            console.log('hello' + form.getValues('username'));
        };
        fetchUserInfo();
    }, [form]);

    const handleEditProfile = async (
        values: z.infer<typeof editProfileFormSchema>
    ) => {
        setIsLoading(true);

        const result = await editProfile(values);
        if (!result?.isSuccess) {
            setResult(result);
        } else {
            toast.success('Profile updated successfully');
            setResult({ isSuccess: true });
            router.refresh();
        }
        setIsLoading(false);
    };

    return (
        <>
            {result?.error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{result.error}</AlertDescription>
                </Alert>
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleEditProfile)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">
                                    Username
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={
                                            form.watch('username') ||
                                            'Enter your username'
                                        }
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name. It can be
                                    your real name or a pseudonym.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">
                                    Full Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={
                                            form.watch('fullName') ||
                                            'Enter your full name'
                                        }
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is real name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">
                                    Phone Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={
                                            form.watch('phoneNumber') ||
                                            'Enter your phone number'
                                        }
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your phone number.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">
                                    Bio
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={
                                            form.watch('bio') ||
                                            'Enter your bio'
                                        }
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Tell us about yourself
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Update profile</Button>
                </form>
            </Form>
        </>
    );
}
