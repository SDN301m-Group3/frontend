'use client';

import { Icons } from '@/components/icons/icons';
import { useSocket } from '@/components/socket-io-provider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { deletePhoto } from '@/lib/action';
import { PhotoDetail } from '@/lib/define';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function DeletePhotoDialog({ photo }: { photo: PhotoDetail }) {
    const { socket } = useSocket();
    const router = useRouter();
    const [checkbox, setCheckbox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeletePhoto = async () => {
        setIsLoading(true);
        const result = await deletePhoto(photo._id);
        if (result?.isSuccess) {
            if (socket && result?.data?.receivers) {
                socket.emit('sendNotification', result?.data);
            }
            toast.success('Photo deleted successfully');
            router.push(`/album/${photo?.album?._id}`);
        } else {
            toast.error('Failed to delete photo');
        }
        setIsLoading(false);
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete photo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete photo</DialogTitle>
                </DialogHeader>
                <div className="items-top flex space-x-2">
                    <Checkbox
                        checked={checkbox}
                        id="terms1"
                        onCheckedChange={() => setCheckbox(!checkbox)}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Are you sure you want to delete this photo?
                        </label>
                        <p className="text-sm text-muted-foreground">
                            This action cannot be undone.
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        disabled={!checkbox || isLoading}
                        onClick={handleDeletePhoto}
                        variant="destructive"
                    >
                        {isLoading && (
                            <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                        )}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
