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
import { useState } from 'react';

export default function OutGroupDialog() {
    const [checkbox, setCheckbox] = useState(false);

    const handleCheckboxChange = (event: any) => {
        setCheckbox(!checkbox);
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Out group</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Out group</DialogTitle>
                    <DialogDescription>
                        Want to get out of the group?
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
                        variant="destructive"
                    >
                        Get out
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
