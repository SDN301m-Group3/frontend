import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function RecentViewCard() {
    return (
        <Card className="transition-all duration-300 ease-in-out cursor-pointer hover:shadow-lg hover:scale-105">
            <CardContent className="p-2">
                <div className="mb-2">
                    <span className="font-bold">Group:</span>
                    <span> Group name here</span>
                </div>
                <AspectRatio ratio={16 / 9} className="bg-muted rounded-sm">
                    <Image
                        src="https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Photo by Drew Beamer"
                        fill
                        className="rounded-md object-cover"
                    />
                </AspectRatio>
                <div className="flex justify-between mt-2">
                    <div className="flex gap-2 items-center">
                        <Avatar className="h-[30px] w-[30px] border-[1px]">
                            <AvatarImage
                                src="/avatar/noavatar.png"
                                alt="avatar"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                            <span className="font-bold">shadcn</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {/* show time */}
                        <span className="text-sm">2 hours ago</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
