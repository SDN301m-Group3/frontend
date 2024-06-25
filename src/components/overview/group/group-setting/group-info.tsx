'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import { getUser } from '@/lib/action';
import { GroupInfo, User } from '@/lib/define';
import { getDateFormatted } from '@/lib/utils';
import { useState } from 'react';

export default function GroupInformation({
    group,
    user,
}: {
    group: GroupInfo;
    user: User;
}) {
    const [checkbox, setCheckbox] = useState(false);

    const handleCheckboxChange = (event: any) => {
        setCheckbox(!checkbox);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="line-clamp-1">{group.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                    {group.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div>
                    <div className="flex gap-2">
                        <Avatar className="border-solid border-sky-500 border-2 w-[40px] h-[40px]">
                            <AvatarImage
                                src={group.owner.img || '/avatar/noavatar.png'}
                                alt="picture"
                            />
                            <AvatarFallback>{'A'}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col justify-around">
                            <p className="text-sm font-medium leading-none">
                                Owner: {group.owner.fullName}{' '}
                                {group.owner._id === user?.aud && '(Me)'}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                Email: {group.owner.email}
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <p className="text-sm font-medium leading-none">
                            Created at: {getDateFormatted(group.createdAt)}
                        </p>
                        <p className="text-sm font-medium leading-none">
                            Total members: {group.members.length}
                        </p>

                        <p className="text-sm font-medium leading-none">
                            Total albums: {group.albums.length}
                        </p>

                        <p className="text-sm font-medium leading-none">
                            Group Code: {group.groupCode}
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
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
                            <Button type="submit" disabled={!checkbox}>
                                Get out
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
}
