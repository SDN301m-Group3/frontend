import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { GroupInfo, User } from '@/lib/define';

export default function GroupMembers({
    group,
    user,
}: {
    group: GroupInfo;
    user: User;
}) {
    return (
        <Card>
            <CardContent className="mt-5">
                <ScrollArea className="h-72">
                    {group.members.map(member => (
                        <div key={member._id} className="mb-2">
                            <div className="flex gap-2">
                                <Avatar className="border-solid border-sky-500 border-2 w-[40px] h-[40px]">
                                    <AvatarImage
                                        src={
                                            group.owner.img ||
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
                            </div>
                            <Separator className="my-4" />
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
