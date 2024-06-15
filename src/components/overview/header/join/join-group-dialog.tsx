'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { UserRoundPlus } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Button } from '@/components/ui/button';
import { joinGroupSchema } from '@/lib/form-schema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icons } from '@/components/icons/icons';
import { joinGroup } from '@/lib/action';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default function JoinGroupDialog() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<
        { error?: string; errorType?: string; isSuccess?: boolean } | undefined
    >(undefined);
    const form = useForm<z.infer<typeof joinGroupSchema>>({
        resolver: zodResolver(joinGroupSchema),
        defaultValues: {
            code: '',
        },
    });

    async function onSubmit(data: z.infer<typeof joinGroupSchema>) {
        setIsLoading(true);

        const result = await joinGroup(data);
        if (!result?.isSuccess) {
            setResult(result);
        } else {
            toast.success('Join group successfully');
            setResult({ isSuccess: true });
            router.push('/group');
            router.refresh();
        }
        setIsLoading(false);
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className=" w-full flex justify-between relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground">
                    <div>Join Group</div>
                    <UserRoundPlus className="w-5 h-5" />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Enter the group code to join
                    </AlertDialogTitle>
                    <div className="flex flex-col gap-5 items-center w-full">
                        You can find the group code in the group settings
                        {result?.error && (
                            <Alert variant="destructive">
                                <ExclamationTriangleIcon className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {result?.error}
                                </AlertDescription>
                            </Alert>
                        )}
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="w-2/3 space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputOTP
                                                    maxLength={6}
                                                    pattern={
                                                        REGEXP_ONLY_DIGITS_AND_CHARS
                                                    }
                                                    {...field}
                                                >
                                                    <InputOTPGroup>
                                                        <InputOTPSlot
                                                            index={0}
                                                        />
                                                        <InputOTPSlot
                                                            index={1}
                                                        />
                                                        <InputOTPSlot
                                                            index={2}
                                                        />
                                                        <InputOTPSeparator />
                                                        <InputOTPSlot
                                                            index={3}
                                                        />
                                                        <InputOTPSlot
                                                            index={4}
                                                        />
                                                        <InputOTPSlot
                                                            index={5}
                                                        />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <Button type="submit">
                                        {isLoading && (
                                            <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Join
                                    </Button>
                                </AlertDialogFooter>
                            </form>
                        </Form>
                    </div>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}
