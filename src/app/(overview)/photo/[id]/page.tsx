import PhotoAction from '@/components/overview/photo/photo-action';
import PhotoCommentList from '@/components/overview/photo/photo-comment-list';
import PhotoInfo from '@/components/overview/photo/photo-info';
import PhotoNotFound from '@/components/overview/photo/photo-not-found';
import PhotoView from '@/components/overview/photo/photo-view';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import SpinLoading from '@/components/shared/spin-loading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getPhotoDetail } from '@/lib/data';
import { BreadItem, PhotoDetail, SearchPhotoCommentParams } from '@/lib/define';
import { Metadata } from 'next';
import { Suspense } from 'react';

type Props = {
    params: { id: string };
    searchParams: SearchPhotoCommentParams;
};

export async function generateMetadata({
    params,
    searchParams,
}: Props): Promise<Metadata> {
    const photo = (await getPhotoDetail(params.id)) as PhotoDetail;

    return {
        title: `Photo: ${photo?.title || 'No title'}`,
        description: `Photo: ${photo?.title || 'No title'} - upload by ${photo?.owner?.username}`,
    };
}

export default async function PhotoPage({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: SearchPhotoCommentParams;
}) {
    const { id } = params;

    const photo = (await getPhotoDetail(id)) as PhotoDetail;

    if (!photo?._id) {
        return <PhotoNotFound />;
    }

    const breadItems = [
        {
            title: 'Group',
            url: '/group',
        },
        {
            title: photo?.group?.title,
            url: `/group/${photo?.group?._id}`,
        },
        {
            title: photo?.album?.title,
            url: `/album/${photo?.album?._id}`,
        },
        {
            title: photo?.title || 'Photo',
            url: `/photo/${photo?._id}`,
        },
    ] as BreadItem[];

    return (
        <>
            <div className="mb-2">
                <BreadcrumbComponent breadcrumbs={breadItems} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
                <div className="col-span-2 lg:col-span-2">
                    <PhotoView photo={photo} />
                </div>
                <div className="col-span-1">
                    <PhotoInfo photo={photo} />

                    <PhotoAction photo={photo} />

                    <ScrollArea className="h-[50vh]">
                        <Suspense
                            key={
                                searchParams.page ||
                                '1' + searchParams.sort + searchParams.pageSize
                            }
                            fallback={<SpinLoading />}
                        >
                            <PhotoCommentList
                                photo={photo}
                                searchParams={searchParams}
                            />
                        </Suspense>
                    </ScrollArea>
                </div>
            </div>
        </>
    );
}
