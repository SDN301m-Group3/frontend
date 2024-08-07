import CommentText from '@/components/shared/comment-text';
import { BasicTooltip } from '@/components/shared/tool-tip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { PhotoComment } from '@/lib/define';
import { getFormatDistanceToNow } from '@/lib/utils';

export default async function PhotoCommentItem({
    comment,
}: {
    comment: PhotoComment;
}) {
    return (
        <div>
            <div className="flex items-start gap-2 md:gap-5 my-5">
                <Avatar className="border-solid border-sky-500 border-2 w-[35px] h-[35px] ">
                    <AvatarImage
                        src={comment.user.img || '/avatar/noavatar.png'}
                        alt="avatar"
                    />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Card className="p-4 pb-2 relative w-full">
                    <div className="flex gap-2 justify-between">
                        <p className="text-base font-bold text-primary">
                            <BasicTooltip title={`${comment.user.fullName}`} />
                        </p>
                        <p className="text-base text-muted-foreground">
                            <BasicTooltip
                                title={`${getFormatDistanceToNow(comment.createdAt)}`}
                            />
                        </p>
                    </div>
                    <div className="mt-3">
                        <CommentText comment={comment.content} />
                    </div>
                </Card>
            </div>
        </div>
    );
}
