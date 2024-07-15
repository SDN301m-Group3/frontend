'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { GroupInfo, User } from '@/lib/define';
import { getDateFormatted } from '@/lib/utils';
import OutGroupDialog from './out-group-dialog';
export default function GroupInformation({
    group,
    user,
}: {
    group: GroupInfo;
    user: User;
}) {
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
            {group.owner._id === user?.aud || (
                <CardFooter className="flex justify-between">
                    <OutGroupDialog group={group} />
                </CardFooter>
            )}
        </Card>
    );
}
