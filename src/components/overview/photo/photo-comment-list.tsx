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

    if (!comments.length) {
        return (
            <div className="text-gray-500 flex justify-center items-center">
                No comments yet
            </div>
        );
    }

    return (
        <div>
            {comments.map((comment) => (
                <PhotoCommentItem key={comment._id} comment={comment} />
            ))}
            <ListPagination meta={pageMeta} />
        </div>
    );
}
