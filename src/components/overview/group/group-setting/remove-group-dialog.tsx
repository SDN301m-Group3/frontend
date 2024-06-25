import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { removeGroup } from '@/lib/action';
import { GroupInfo } from '@/lib/define';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useSocket } from '@/components/socket-io-provider';

export default function RemoveGroupDialog({ group }: { group: GroupInfo }) {
    const { socket } = useSocket();
    const router = useRouter();
    const [checkbox, setCheckbox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<
        { error?: string; errorType?: string; isSuccess?: boolean } | undefined
    >(undefined);

    const handleCheckboxChange = (event: any) => {
        setCheckbox(!checkbox);
    };

    const handleDeleteGroup = async () => {
        setIsLoading(true);
        const result = await removeGroup(group._id);
        if (!result?.isSuccess) {
            setResult(result);
            toast.error(result?.error);
        } else {
            if (socket) {
                socket.emit('sendNotification', result?.data);
            }
            toast.success('Group deleted successfully');
            setResult({ isSuccess: true });
            router.push('/');
        }
        setIsLoading(false);
    };
    return (
        <>
            {result?.error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{result.error}</AlertDescription>
                </Alert>
            )}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="destructive">Delete group</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete group</DialogTitle>
                        <DialogDescription>
                            Want to delete the group?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="items-top flex space-x-2">
                        <Checkbox
                            id="terms1"
                            onCheckedChange={handleCheckboxChange}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="terms1"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Are you sure ?
                            </label>
                            <p className="text-sm text-muted-foreground">
                                You may lose all of these memories
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={!checkbox}
                            onClick={handleDeleteGroup}
                            variant="destructive"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
