'use client';

import { createGroupFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons/icons';
import { createGroup } from '@/lib/action';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CreateGroupForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<
        { error?: string; errorType?: string; isSuccess?: boolean } | undefined
    >(undefined);

    const form = useForm<z.infer<typeof createGroupFormSchema>>({
        resolver: zodResolver(createGroupFormSchema),
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const handleCreateGroup = async (
        values: z.infer<typeof createGroupFormSchema>
    ) => {
        setIsLoading(true);

        const result = await createGroup(values);
        if (!result?.isSuccess) {
            setResult(result);
        } else {
            toast.success('Group created successfully');
            setResult({ isSuccess: true });
            router.push('/groups');
            router.refresh();
        }
        setIsLoading(false);
    };
    return (
        <>
            {result?.error && (
                <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{result?.error}</AlertDescription>
                </Alert>
            )}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreateGroup)}>
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        htmlFor="title"
                                        className="text-primary"
                                    >
                                        Title &nbsp;
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="title"
                                            placeholder="Title"
                                            type="text"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            autoFocus
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="items-start">
                                        Title of the group
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        htmlFor="description"
                                        className="text-primary"
                                    >
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="description"
                                            placeholder="Description"
                                            type="text"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="items-start">
                                        Description of the group
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="mt-5"
                            variant="default"
                        >
                            {isLoading && (
                                <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                            )}
                            Create
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
