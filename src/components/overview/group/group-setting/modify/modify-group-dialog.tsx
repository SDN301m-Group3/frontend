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
import ModifyGroupForm from './modify-group-form';
import { useState } from 'react';
import { GroupInfo, User } from '@/lib/define';

export default function GroupModifyDialog({
    group
}: {
    group: GroupInfo;
}) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className=" w-full flex justify-between relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:text-accent-foreground">
                    <div>Modify Group</div>
                    <Users className="w-5 h-5" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modify group</DialogTitle>
                    <div className="flex flex-col gap-5 items-center">
                        Modify information about group
                    </div>
                </DialogHeader>
                <ModifyGroupForm  
                    group={group} 
                    setOpen={setOpen} 
                />
            </DialogContent>
        </Dialog>
    );
}
