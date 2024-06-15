import AlbumSettingDialog from '@/components/overview/album/album-setting-dialog';
import PhotoList from '@/components/overview/album/photo-list';
import SearchPhoto from '@/components/overview/album/search-photo';
import SortSelect from '@/components/shared/sort-select';
import { BasicTooltip } from '@/components/shared/tool-tip';
import { Button } from '@/components/ui/button';
import { getAlbumInfo, getPhotosByAlbumId } from '@/lib/data';
import { SearchPhotoParams, SortOption } from '@/lib/define';

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

    return (
        <section>
            <div className="flex flex-col gap-8">
                <SearchPhoto />
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold" id="album-name">
                        <BasicTooltip title={`Album: ${album.title}`} />
                    </h1>
                    <div className="flex justify-between">
                        <Button>Upload</Button>
                        <AlbumSettingDialog album={album} />
                    </div>
                </div>

                <SortSelect
                    sort={searchParams.sort}
                    options={selectOptions}
                    url={`/album/${id}`}
                />
                <PhotoList _id={id} searchParams={searchParams} />
                {/* <SearchForm commands={commands} /> */}
                {/* <GalleryGrid images={results.resources} /> */}
            </div>
        </section>
    );
}
