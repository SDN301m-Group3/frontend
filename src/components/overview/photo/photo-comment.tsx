import CommentText from '@/components/shared/comment-text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getFormatDistanceToNow } from '@/lib/utils';
import { HeartIcon } from '@radix-ui/react-icons';

export default async function PhotoComment({ comment }: { comment: any }) {
    // const isLiked = await isLikedComment(comment.id);

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
                <Card className="p-4 pb-2 relative max-w-[90%]">
                    <div className="flex gap-2">
                        <p className="text-base font-bold leading-none text-primary">
                            {comment.user.fullName}
                        </p>
                        <p className="text-base leading-none text-muted-foreground max-md:hidden">
                            @{comment.user.username}
                        </p>
                        <p className="text-base leading-none text-muted-foreground">
                            {getFormatDistanceToNow(comment.createdAt)}
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
