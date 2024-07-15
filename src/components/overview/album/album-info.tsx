import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { AlbumInfo, User } from '@/lib/define';
import { getDateFormatted } from '@/lib/utils';
import { ShareAlbumDialog } from './share-album-dialog';

export default function AlbumInformation({
    album,
    user,
}: {
    album: AlbumInfo;
    user: User;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="line-clamp-1 flex gap-2 justify-between">
                    <p>{album.title}</p>
                    <ShareAlbumDialog album={album} user={user} />
                </CardTitle>
                <CardDescription className="line-clamp-2">
                    {album.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div>
                    <div className="flex gap-2">
                        <Avatar className="border-solid border-sky-500 border-2 w-[40px] h-[40px]">
                            <AvatarImage
                                src={
                                    album?.owner?.img || '/avatar/noavatar.png'
                                }
                                alt="picture"
                            />
                            <AvatarFallback>{'A'}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col justify-around">
                            <p className="text-sm font-medium leading-none">
                                Owner: {album?.owner?.fullName}{' '}
                                {album?.owner?._id === user?.aud && '(Me)'}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                Email: {album?.owner?.email}
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <p className="text-sm font-medium leading-none">
                            Created at: {getDateFormatted(album.createdAt)}
                        </p>
                        <p className="text-sm font-medium leading-none">
                            Total members: {album.members.length}
                        </p>

                        <p className="text-sm font-medium leading-none">
                            This album is belong to: {album.group.title}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
