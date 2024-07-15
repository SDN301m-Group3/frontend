'use client';

import { PhotoDetail, ReactUser } from '@/lib/define';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getReactList } from '@/lib/action';

export default function ReactListDialog({ photo }: { photo: PhotoDetail }) {
    const [reacts, setReacts] = useState([] as ReactUser[]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            console.log('get react list');
            getReactList(photo._id).then((data) => {
                setReacts(data);
            });
        }
    }, [photo, isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => setIsOpen(true)}
                >
                    <Heart className="w-4 h-4" />
                    <span>{photo.totalReact}</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>React List</DialogTitle>
                    <DialogDescription>
                        List of users who have reacted to this photo
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-72 p-2">
                    {reacts.length === 0 && (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-lg text-muted-foreground">
                                No one has reacted to this photo yet
                            </p>
                        </div>
                    )}
                    {reacts.map((react) => (
                        <div key={react._id} className="mb-2">
                            <div className="flex gap-2">
                                <Avatar className="border-solid border-sky-500 border-2 w-[40px] h-[40px]">
                                    <AvatarImage
                                        src={
                                            react?.user.img ||
                                            '/avatar/noavatar.png'
                                        }
                                        alt="avatar"
                                    />
                                    <AvatarFallback>{'A'}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col justify-around">
                                    <p className="text-sm font-medium leading-none">
                                        {react?.user?.fullName}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        Email: {react?.user?.email}
                                    </p>
                                </div>
                            </div>
                            <Separator className="my-4" />
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
