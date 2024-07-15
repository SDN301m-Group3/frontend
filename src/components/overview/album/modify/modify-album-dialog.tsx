'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Users } from 'lucide-react';
import { useState } from 'react';
import ModifyAlbumForm from './modify-album-form';
import { AlbumInfo, User } from '@/lib/define';

export default function ModifyAlbumDialog({
    album
}: {
    album: AlbumInfo;
}) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className=" w-full flex justify-between relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer ">
                    <div>Modify Album</div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modify album</DialogTitle>
                    <div className="flex flex-col gap-5 items-center">
                        Modify information about album
                    </div>
                </DialogHeader>
                <ModifyAlbumForm  
                    album={album} 
                    setOpen={setOpen} 
                />
            </DialogContent>
        </Dialog>
    );
}