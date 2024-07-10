'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PhotoDetail } from '@/lib/define';
import { getDateFormatted, getFormatDistanceToNow } from '@/lib/utils';
import FileSaver from 'file-saver';

export default function PhotoInfo({ photo }: { photo: PhotoDetail }) {

    const handleDownloadPhoto = () => {
        if (!photo) {
            console.error('Photo not found');
            return;
        }
        const [fileType, extension] = photo.mimeType.split('/');
        if (fileType !== 'image') {
            console.error('Unsupported file type', photo.mimeType);
        }

        const url = photo.url
            // 'https://s3.ap-southeast-1.amazonaws.com/photoco.server.dev/666f05526be286e666d21bb1/2029165-1720570854264-adb47ce4-b25e-489e-8777-cd7bca75a955.jpg'
        const fileName = photo._id + '.' + extension;

        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.open('GET', url);
        xhr.onload = function () {
            const urlCreator = window.URL || window.webkitURL;
            const blobUrl = urlCreator.createObjectURL(this.response);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            link.click();
        }
        xhr.send();
    }

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
                            {photo?.owner?.fullName}{' '}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {photo?.owner?.email}
                        </p>
                    </div>
                </div>
                <Button
                    onClick={handleDownloadPhoto}
                >
                    Download
                </Button>
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
