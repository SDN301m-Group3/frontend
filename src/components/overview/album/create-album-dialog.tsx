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
import CreateAlbumForm from './create-album-form';
import { useState } from 'react';

export default function CreateAlbumDialog({ groupId }: { groupId: string }) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className=" w-full flex justify-between relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer ">
                    <div>Create New Album</div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new album</DialogTitle>
                    <div className="flex flex-col gap-5 items-center">
                        Create a new album and invite your friends in group
                    </div>
                </DialogHeader>
                <CreateAlbumForm groupId={groupId} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
}
