'use client';

import {  modifyGroupFormSchema } from '@/lib/form-schema';
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
import { modifyGroup } from '@/lib/action';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { GroupInfo } from '@/lib/define';


export default function ModifyGroupForm({
    group,
    setOpen,
}: {
    group: GroupInfo;
    setOpen: (open: boolean) => void;
}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<
        { error?: string; errorType?: string; isSuccess?: boolean } | undefined
    >(undefined);

    const form = useForm<z.infer<typeof modifyGroupFormSchema>>({
        resolver: zodResolver(modifyGroupFormSchema),
        defaultValues: {
            title: group.title,
            description: group.description,
            groupImg: null,
        },
    });

    const handleModifyGroup = async (
        values: z.infer<typeof modifyGroupFormSchema>
    ) => {
        setIsLoading(true);

        const result = await modifyGroup(group._id, values);
        if (!result?.isSuccess) {
            setResult(result);
        } else {
            toast.success('Group modified successfully');
            setResult({ isSuccess: true });
            setOpen(false);
            router.push('/group');
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
                <form onSubmit={form.handleSubmit(handleModifyGroup)}>
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
                        {/* <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        htmlFor="image"
                                        className="text-primary"
                                    >
                                        Image
                                    </FormLabel>
                                    <FormControl>
                                        <FileInput
                                            id="image"
                                            placeholder="Upload image"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="items-start">
                                        Upload an image for the group
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="mt-5"
                            variant="default"
                        >
                            {isLoading && (
                                <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                            )}
                            Modify
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}