import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
    CrossCircledIcon,
    DotsHorizontalIcon,
    FaceIcon,
    PaperPlaneIcon,
    Pencil2Icon,
} from '@radix-ui/react-icons';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, UserRoundPlus } from 'lucide-react';
import JoinGroupDialog from './join-group-dialog';
import CreateGroupDialog from './create-group-dialog';

export default function ButtonJoin() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="hidden">
                    <Plus />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 m-0 p-1">
                <div className="grid ">
                    <h4 className="leading-none px-2 py-1.5 text-sm font-semibold">
                        Action
                    </h4>
                    <Separator className="my-1" />
                    <div className="grid grid-cols-1 ">
                        <JoinGroupDialog />
                        <CreateGroupDialog />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
