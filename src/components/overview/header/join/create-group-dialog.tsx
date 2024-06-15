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
import { UserRoundPlus, Users } from 'lucide-react';
import CreateGroupForm from './create-group-form';
import { useState } from 'react';

export default function CreateGroupDialog() {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className=" w-full flex justify-between relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground">
                    <div>Create Group</div>
                    <Users className="w-5 h-5" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new group</DialogTitle>
                    <div className="flex flex-col gap-5 items-center">
                        Create a new group and invite your friends
                    </div>
                </DialogHeader>
                <CreateGroupForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
}
