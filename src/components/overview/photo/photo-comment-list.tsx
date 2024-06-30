import { PhotoDetail, SearchPhotoCommentParams } from '@/lib/define';
import { getPhotoComments } from '@/lib/data';
import PhotoCommentItem from './photo-comment';
import ListPagination from '@/components/shared/list-pagination';

export default async function PhotoCommentList({
    photo,
    searchParams,
}: {
    photo: PhotoDetail;
    searchParams: SearchPhotoCommentParams;
}) {
    const { comments, pageMeta } = await getPhotoComments(
        photo._id,
        searchParams
    );
    console.log(comments);

    return (
        <div>
            {comments.map((comment) => (
                <PhotoCommentItem key={comment._id} comment={comment} />
            ))}
            <ListPagination meta={pageMeta} />
        </div>
    );
}
