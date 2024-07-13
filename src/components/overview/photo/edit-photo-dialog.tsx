'use client';

import { Icons } from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { editPhoto } from '@/lib/action';
import { PhotoDetail } from '@/lib/define';
import { editPhotoSchema } from '@/lib/form-schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilePenLine, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { DeletePhotoDialog } from './delete-photo-dialog';

export function EditPhotoDialog({ photo }: { photo: PhotoDetail }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof editPhotoSchema>>({
        resolver: zodResolver(editPhotoSchema),
        defaultValues: {
            title: photo?.title || '',
            tags: photo?.tags.map((tag) => ({ value: tag })) || [],
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

    async function onSubmit(data: z.infer<typeof editPhotoSchema>) {
        setIsLoading(true);
        const result = await editPhoto(
            photo._id,
            data.title,
            data?.tags?.map((tag) => tag.value) || []
        );
        if (result.isSuccess) {
            router.refresh();
            toast.success('Edit photo successfully');
            setOpen(false);
        } else {
            toast.error(result?.error || 'Edit photo failed');
        }
        setIsLoading(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="hidden"
                    className="flex gap-2 items-center hover:text-sky-600 hover:dark:bg-gray-700 hover:bg-sky-100"
                >
                    <FilePenLine className="w-6 h-6 cursor-pointer self-center" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit photo</DialogTitle>
                    <DialogDescription>
                        Update your photo information here. (Member can find
                        your photo by searching photo title and tags)
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
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
                                            !field.value &&
                                                'text-muted-foreground'
                                        )}
                                    >
                                        <Input placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {tagsFields.map((tagField, index) => (
                                <FormField
                                    key={tagField.id}
                                    control={form.control}
                                    name={`tags.${index}.value`}
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
                                    onClick={() => appendTags({ value: '' })}
                                >
                                    <Plus className="mr-2 h-4 w-4 text-sky-500" />
                                    Add tag
                                </Button>
                            )}
                        </div>
                        <div className="flex justify-between md:justify-end gap-2">
                            <DeletePhotoDialog photo={photo} />
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && (
                                    <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                                )}
                                Save changes
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
