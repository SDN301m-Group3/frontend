'use client';

import { Icons } from '@/components/icons/icons';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { addPhoto, uploadImage } from '@/lib/action';
import { uploadPhotoSchema } from '@/lib/form-schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function PhotoUploadForm({
    albumId,
    setOpen,
}: {
    albumId: string;
    setOpen: (open: boolean) => void;
}) {
    const { refresh } = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState('');

    const form = useForm<z.infer<typeof uploadPhotoSchema>>({
        resolver: zodResolver(uploadPhotoSchema),
        defaultValues: {
            title: '',
            url: '',
            tags: [],
        },
    });

    const {
        append: appendTags,
        fields: tagsFields,
        remove: removeTags,
    } = useFieldArray({
        control: form.control,
        name: 'tags',
    });

    function getImageData(event: ChangeEvent<HTMLInputElement>) {
        const dataTransfer = new DataTransfer();

        Array.from(event.target.files!).forEach((url) =>
            dataTransfer.items.add(url)
        );

        const files = dataTransfer.files;
        const displayUrl = URL.createObjectURL(event.target.files![0]);

        return { files, displayUrl };
    }

    async function onSubmit(data: z.infer<typeof uploadPhotoSchema>) {
        setIsLoading(true);
        const formImageData = new FormData();
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value == undefined) return;
            if (key === 'url' && typeof value !== 'string') {
                formImageData.append(key, value);
            } else {
                formData.append(key, value);
            }
        });
        if (formImageData.has('url')) {
            const imageValue = formImageData.get('url');
            if (imageValue !== null) {
                const formImage = new FormData();
                formImage.set('url', imageValue);
                const result = await uploadImage(formImage, 'post/');
                if (result.isSuccess) {
                    data.url = result.url;
                } else {
                    toast.error('Có lỗi xảy ra khi tải ảnh bìa');
                }
            }
        }
        const result = await addPhoto(data, albumId);
        if (result.isSuccess) {
            toast.success('Upload photo successfully');
            setOpen(false);
            refresh();
        } else {
            console.error(result.error);
        }

        setIsLoading(false);
    }
    return (
        <ScrollArea className="h-[30rem] p-2">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field: { onChange, value, ...rest } }) => (
                            <>
                                <FormItem>
                                    <div className="flex flex-col gap-2">
                                        <FormLabel className="text-primary">
                                            Upload photo
                                        </FormLabel>
                                        <label
                                            className={buttonVariants({
                                                variant: 'outline',
                                            })}
                                            htmlFor="url"
                                        >
                                            Choose File
                                        </label>
                                    </div>
                                    {preview && (
                                        <AspectRatio
                                            ratio={16 / 9}
                                            className="bg-muted"
                                        >
                                            <Image
                                                src={preview}
                                                alt="Photo preview"
                                                fill
                                                className="rounded-md object-cover"
                                            />
                                        </AspectRatio>
                                    )}

                                    <FormControl>
                                        <Input
                                            id="url"
                                            className="hidden"
                                            accept={'image/*'}
                                            type="file"
                                            {...rest}
                                            onChange={(event) => {
                                                const { files, displayUrl } =
                                                    getImageData(event);
                                                setPreview(displayUrl);
                                                onChange(files[0]);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">
                                    Title
                                </FormLabel>
                                <FormControl
                                    className={cn(
                                        '',
                                        !field.value && 'text-muted-foreground'
                                    )}
                                >
                                    <Input placeholder="Title" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {tagsFields.map((tagField, index) => (
                            <FormField
                                key={tagField.id}
                                control={form.control}
                                name={`tags.${index}`}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex gap-2 items-center">
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                className="h-10"
                                                onClick={() =>
                                                    removeTags(index)
                                                }
                                            >
                                                <Trash2 className="text-red-500 w-5 h-5" />
                                            </Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        {tagsFields.length < 5 && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => appendTags('')}
                            >
                                <Plus className="mr-2 h-4 w-4 text-sky-500" />
                                Add tag
                            </Button>
                        )}
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                        )}
                        Upload photo
                    </Button>
                </form>
            </Form>
        </ScrollArea>
    );
}
