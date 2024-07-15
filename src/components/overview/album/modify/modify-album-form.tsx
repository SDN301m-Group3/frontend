'use client';

import { Icons } from '@/components/icons/icons';
import { useSocket } from '@/components/socket-io-provider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
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
import { modifyAlbum } from '@/lib/action';
import { AlbumInfo } from '@/lib/define';
import { createAlbumFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function CreateAlbumForm({
    album,
    setOpen,
}: {
    album: AlbumInfo;
    setOpen: (open: boolean) => void;
}) {
    const router = useRouter();
    const { socket } = useSocket();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<
        { error?: string; errorType?: string; isSuccess?: boolean } | undefined
    >(undefined);

    const form = useForm<z.infer<typeof createAlbumFormSchema>>({
        resolver: zodResolver(createAlbumFormSchema),
        defaultValues: {
            title: album.title,
            description: album.description,
        },
    });

    const handleModifyAlbum = async (
        values: z.infer<typeof createAlbumFormSchema>
    ) => {
        setIsLoading(true);

        const result = await modifyAlbum(album._id, values);
        if (!result?.isSuccess) {
            setResult(result);
        } else {
            toast.success('Album modified successfully');
            if (socket && result?.data?.receivers) {
                socket.emit(`sendNotification`, result?.data);
            }
            setResult({ isSuccess: true });
            setOpen(false);
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
                <form onSubmit={form.handleSubmit(handleModifyAlbum)}>
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
                                        Title of the album
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
                                        Description of the album
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
                            Modify
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
