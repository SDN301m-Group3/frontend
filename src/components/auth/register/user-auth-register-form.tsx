'use client';
import {
    EnvelopeOpenIcon,
    ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { useRouter, useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { registerFormSchema } from '@/lib/form-schema';
import { Icons } from '@/components/icons/icons';
import { register } from '@/lib/action';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthRegisterForm({
    className,
    ...props
}: UserAuthFormProps) {
    const { push } = useRouter();
    const [registerResult, setRegisterResult] = React.useState<
        { error?: string } | undefined
    >(undefined);
    const searchParams = useSearchParams();
    const success = searchParams.get('success');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            fullName: '',
            username: '',
            email: '',
            phoneNumber: '',
            password: '',
        },
    });

    const handleRegister = async (
        values: z.infer<typeof registerFormSchema>
    ) => {
        setIsLoading(true);

        const result = await register(values);

        if (result.isSuccess) {
            setRegisterResult(undefined);
            push('/register?success=true');
        } else {
            setRegisterResult({ error: result.error });
        }

        setIsLoading(false);
    };

    if (success) {
        return (
            <Alert>
                <EnvelopeOpenIcon className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary">
                    Congratulations
                </AlertTitle>
                <AlertDescription className="text-primary">
                    Your account has been created successfully. Please check
                    your email to activate your account.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            {registerResult?.error && (
                <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{registerResult?.error}</AlertDescription>
                </Alert>
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleRegister)}
                    className="space-y-8"
                >
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary">
                                        Full name
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            autoFocus
                                            disabled={isLoading}
                                            placeholder="Full name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary">
                                        Username
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary">
                                        Email
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="name@email.com"
                                            {...field}
                                        />
                                    </FormControl>
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
                                        Phone number
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Phone number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between">
                                        <FormLabel className="text-primary">
                                            Password
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                    </div>
                                    <FormControl>
                                        <PasswordInput
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="mt-5"
                        >
                            {isLoading && (
                                <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                            )}
                            Register
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
