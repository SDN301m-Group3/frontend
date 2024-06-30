import ViewImages from '@/components/shared/view-images';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { PhotoDetail } from '@/lib/define';
import Image from 'next/image';

export default function PhotoView({ photo }: { photo: PhotoDetail }) {
    return (
        <Dialog>
            <DialogTrigger asChild className="cursor-pointer">
                <div className="w-full h-[85vh] lg:h-[85vh] flex justify-center ">
                    <Image
                        className="object-contain h-full rounded-lg"
                        src={photo.url}
                        alt={photo.title || 'Photo'}
                        width={1000}
                        height={1000}
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px] p-0 bg-transparent border-none">
                <ViewImages images={[photo.url]} />
            </DialogContent>
        </Dialog>
    );
}
