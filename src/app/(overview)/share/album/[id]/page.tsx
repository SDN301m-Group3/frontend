import AlbumNotFound from '@/components/overview/album/album-not-found';
import Gallery from '@/components/shared/gallery-images';
import ListPagination from '@/components/shared/list-pagination';
import SortSelect from '@/components/shared/sort-select';
import SpinLoading from '@/components/shared/spin-loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAlbumInfo, getSharePhotosByAlbumId } from '@/lib/data';
import { SearchSharePhotoParams, SortOption } from '@/lib/define';
import { getDateFormatted } from '@/lib/utils';
import { Suspense } from 'react';

const selectOptions = [
    {
        label: 'Newest',
        value: 'desc',
        field: 'sort',
    },
    {
        label: 'Oldest',
        value: 'asc',
        field: 'sort',
    },
] as SortOption[];

export default async function Page({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: SearchSharePhotoParams;
}) {
    const { id } = params;

    const { photos, pageMeta, shareUser, expiredTime } =
        await getSharePhotosByAlbumId(id, searchParams);

    if (!shareUser?._id) {
        return <AlbumNotFound />;
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-2 justify-between">
                <div className="flex gap-2">
                    <Avatar className="border-solid border-sky-500 border-2 w-[40px] h-[40px]">
                        <AvatarImage
                            src={shareUser?.img || '/avatar/noavatar.png'}
                            alt="avatar"
                        />
                        <AvatarFallback>{'A'}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-around">
                        <p className="text-sm font-medium leading-none">
                            Shared User: {shareUser?.fullName} ({' '}
                            {shareUser?.username})
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            Email: {shareUser?.email}
                        </p>
                    </div>
                </div>
                <div>
                    <p className="text-sm leading-none text-muted-foreground">
                        Expired Time: {getDateFormatted(expiredTime)}
                    </p>
                </div>
            </div>
            <div className="flex gap-2 items-center my-2">
                <SortSelect
                    sort={searchParams.sort}
                    options={selectOptions}
                    url={`/share/album/${id}`}
                />
            </div>
            <Suspense
                key={
                    searchParams.page ||
                    '1' +
                        searchParams.sort +
                        searchParams.pageSize +
                        searchParams.shareToken
                }
                fallback={<SpinLoading />}
            >
                <div>
                    <Gallery photos={photos} />

                    <ListPagination meta={pageMeta} bookmark="album-name" />
                </div>
            </Suspense>
        </>
    );
}
