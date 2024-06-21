import AlbumMembers from '@/components/overview/album/album-members';
import AlbumSettingDialog from '@/components/overview/album/album-setting-dialog';
import PhotoList from '@/components/overview/album/photo-list';
import PhotoUploadDialog from '@/components/overview/album/photo-upload-dialog';
import SearchBadge from '@/components/overview/album/search-badge';
import SearchPhoto from '@/components/overview/album/search-photo';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import SortSelect from '@/components/shared/sort-select';
import SpinLoading from '@/components/shared/spin-loading';
import { BasicTooltip } from '@/components/shared/tool-tip';
import { getAlbumInfo, getPhotosByAlbumId } from '@/lib/data';
import { BreadItem, SearchPhotoParams, SortOption } from '@/lib/define';
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

export default async function AlbumPage({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: SearchPhotoParams;
}) {
    const { id } = params;

    const album = await getAlbumInfo(id);

    const breadItems = [
        {
            title: 'Group',
            url: '/group',
        },
        {
            title: album.group.title,
            url: `/group/${album.group._id}`,
        },
        {
            title: album.title,
            url: `/album/${album._id}`,
        },
    ] as BreadItem[];

    return (
        <section>
            <div>
                <SearchPhoto />
                <div className="my-5">
                    <AlbumMembers albumId={id} />
                </div>

                <div className="my-2">
                    <BreadcrumbComponent breadcrumbs={breadItems} />
                </div>

                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold" id="album-name">
                        <BasicTooltip title={`Album: ${album.title}`} />
                    </h1>
                    <div className="flex justify-between">
                        <PhotoUploadDialog albumId={id} />
                        <AlbumSettingDialog album={album} />
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <SortSelect
                        sort={searchParams.sort}
                        options={selectOptions}
                        url={`/album/${id}`}
                    />
                    <div>
                        {searchParams.search && (
                            <SearchBadge query={searchParams.search} />
                        )}
                    </div>
                </div>

                <Suspense
                    key={
                        searchParams.page ||
                        '1' + searchParams.sort + searchParams.pageSize
                    }
                    fallback={<SpinLoading />}
                >
                    <PhotoList _id={id} searchParams={searchParams} />
                </Suspense>
                {/* <SearchForm commands={commands} /> */}
                {/* <GalleryGrid images={results.resources} /> */}
            </div>
        </section>
    );
}
