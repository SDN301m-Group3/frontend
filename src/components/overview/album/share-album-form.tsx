'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlbumInfo, User } from '@/lib/define';
import { toast } from 'sonner';
import { useState } from 'react';
import { Copy, Share } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { shareAlbum } from '@/lib/action';
import { Icons } from '@/components/icons/icons';
import { getDateFormatted } from '@/lib/utils';
import { siteConfig } from '@/config/site';

const FormSchema = z.object({
    time: z.enum(['86400', '259200', '604800', '2592000'], {
        required_error: 'Please select a time.',
    }),
});

export function ShareAlbumForm({
    album,
    user,
}: {
    album: AlbumInfo;
    user: User;
}) {
    const [result, setResult] = useState<
        { error?: string; data: any; isSuccess?: boolean } | undefined
    >(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        await shareAlbum(album._id, +data.time).then((res) => {
            setResult(res);
        });
        setIsLoading(false);
    }

    return (
        <>
            {result?.isSuccess ? (
                <>
                    <div className="bg-secondary flex gap-2 p-2 justify-between items-center rounded-lg shadow-md overflow-x-auto">
                        <Button
                            variant="hidden"
                            className="p-0"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    `${siteConfig.url}/share/album/${album._id}?shareToken=${result?.data?.shareToken}`
                                );
                                toast.success('Link copied to clipboard');
                            }}
                        >
                            <Copy />
                        </Button>
                        <p className="text-sm">
                            {`${siteConfig.url}/share/album/${album._id}?shareToken=${result?.data?.shareToken}`}
                        </p>
                    </div>
                    <div>
                        Expires: {getDateFormatted(result?.data?.expiredTime)}
                    </div>
                </>
            ) : result?.error ? (
                <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {result?.error || 'Unknown error'}
                    </AlertDescription>
                </Alert>
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-2/3 space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>
                                        Share this album for...
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                            disabled={isLoading}
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="86400" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    1 day (24 hours)
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="259200" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    3 days (72 hours)
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="604800" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    7 days (1 week)
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="2592000" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    30 days (1 month)
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                            )}
                            Share
                        </Button>
                    </form>
                </Form>
            )}
        </>
    );
}
