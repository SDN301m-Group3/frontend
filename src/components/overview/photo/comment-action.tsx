'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PhotoDetail, User } from '@/lib/define';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { photoCommentSchema } from '@/lib/form-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/icons/icons';
import { commentOnPhoto } from '@/lib/action';
import { useSocket } from '@/components/socket-io-provider';
import { useRouter } from 'next/navigation';

export default function CommentAction({
    user,
    photo,
}: {
    user: User;
    photo: PhotoDetail;
}) {
    const router = useRouter();
    const { socket } = useSocket();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof photoCommentSchema>>({
        resolver: zodResolver(photoCommentSchema),
        defaultValues: {
            content: '',
        },
    });
    const handleSubmitComment = async (
        values: z.infer<typeof photoCommentSchema>
    ) => {
        setIsLoading(true);

        const result = await commentOnPhoto(photo._id, values.content);
        if (!result.isSuccess) {
            toast.error(result.error);
        } else {
            if (photo.owner._id !== user.aud) {
                if (socket && result?.data?.receivers) {
                    socket.emit(`sendNotification`, result?.data);
                }
            }
            setOpen(false);
            toast.success('Comment successfully');
            form.reset();
            router.refresh();
        }
        setIsLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex gap-2 items-center hover:text-sky-600 hover:dark:bg-gray-700 hover:bg-sky-100 p-2 px-5 rounded-md cursor-pointer">
                    <MessageCircle />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] ">
                <div className="mt-5">
                    <div className="flex items-start justify-start gap-2 md:gap-5">
                        <Avatar className="border-solid border-sky-500 border-2 w-[35px] h-[35px] md:w-[45px] md:h-[45px]">
                            <AvatarImage
                                src={user?.img || '/avatar/noavatar.png'}
                                alt="avatar"
                            />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(
                                        handleSubmitComment
                                    )}
                                >
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea
                                                        id="content"
                                                        placeholder="Comment..."
                                                        disabled={isLoading}
                                                        {...field}
                                                        className="focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="mt-2 flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            variant="default"
                                        >
                                            {isLoading && (
                                                <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Send
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
