import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PhotoDetail } from '@/lib/define';
import { getDateFormatted, getFormatDistanceToNow } from '@/lib/utils';

export default function PhotoInfo({ photo }: { photo: PhotoDetail }) {
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Avatar className="border-solid border-sky-500 border-2 w-[40px] h-[40px]">
                        <AvatarImage
                            src={photo?.owner?.img || '/avatar/noavatar.png'}
                            alt={photo?.title || 'Photo'}
                        />
                        <AvatarFallback>{'A'}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-around">
                        <p className="text-sm font-medium leading-none">
                            Owner: {photo?.owner?.fullName}{' '}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            Email: {photo?.owner?.email}
                        </p>
                    </div>
                </div>
                <Button>Download</Button>
            </div>
            <div className="my-2 flex gap-2 flex-wrap">
                {photo?.tags?.map((tag, index) => (
                    <Badge key={index}>{tag}</Badge>
                ))}
            </div>
            <div>
                <h1 className="text-2xl font-bold">{photo?.title}</h1>
                <p className="text-sm text-muted-foreground">
                    Upload at: {getDateFormatted(photo.createdAt)} (
                    {getFormatDistanceToNow(photo.createdAt)})
                </p>
            </div>
        </>
    );
}
