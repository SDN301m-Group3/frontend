'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { GroupInfo, User } from '@/lib/define';
import { SearchUsers } from './search-users';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Ellipsis, BookUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KickGroupMemberDialog } from './kick-group-member-dialog';

export default function GroupMembers({
    group,
    user,
}: {
    group: GroupInfo;
    user: User;
}) {
    return (
        <>
            <div className="my-2 flex justify-center gap-2">
                <SearchUsers groupId={group._id} />
            </div>

            <Card>
                <CardContent className="mt-5">
                    <ScrollArea className="h-72">
                        {group.members.map((member) => (
                            <div key={member._id} className="mb-2">
                                <div className="flex gap-2">
                                    <Avatar className="border-solid border-sky-500 border-2 w-[40px] h-[40px]">
                                        <AvatarImage
                                            src={
                                                member.img ||
                                                '/avatar/noavatar.png'
                                            }
                                            alt="picture"
                                        />
                                        <AvatarFallback>{'A'}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col justify-around">
                                        <p className="text-sm font-medium leading-none">
                                            {group.owner._id === member._id
                                                ? 'Owner'
                                                : 'Member'}
                                            : {member.fullName}{' '}
                                            {member._id === user?.aud && '(Me)'}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            Email: {member.email}
                                        </p>
                                    </div>
                                    {/* non justify center for below */}
                                    <div className="ml-auto ">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="hidden">
                                                    <Ellipsis />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32 m-0 px-1 py-1">
                                                <div className="grid ">
                                                    <div className="grid grid-cols-1 ">
                                                        <div className=" w-full flex justify-between relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground">
                                                            <div>Profile</div>
                                                            <BookUser className="w-5 h-5" />
                                                        </div>
                                                        {group.owner._id ===
                                                            user?.aud &&
                                                            member._id !==
                                                                user?.aud && (
                                                                <KickGroupMemberDialog
                                                                    group={
                                                                        group
                                                                    }
                                                                    member={
                                                                        member
                                                                    }
                                                                />
                                                            )}
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <Separator className="my-4" />
                            </div>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    );
}
