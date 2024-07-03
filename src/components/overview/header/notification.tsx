'use client';

import { Bell, Dot } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, UserNotification } from '@/lib/define';
import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSocket } from '@/components/socket-io-provider';
import { getUserNotifications, markNotificationAsSeen } from '@/lib/action';
import { cn, getFormatDistanceToNow } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Notification({ user }: { user: User }) {
    const router = useRouter();
    const { socket } = useSocket();
    const [notification, setNotification] = useState<UserNotification[]>([]);

    useEffect(() => {
        if (socket) {
            socket.on('getNotification', (data: UserNotification) => {
                setNotification((prevNotifications) => [
                    data,
                    ...prevNotifications,
                ]);
                toast(
                    `You have new notification from ${data.user.fullName} (${data.user.username})`,
                    {
                        description: data.content,
                        action: {
                            label: 'See more',
                            onClick: () => {
                                handleSeenNoti(data);
                                router.push(data.redirectUrl);
                            },
                        },
                    }
                );
            });
        }

        // Clean up the event listeners when the component is unmounted
        return () => {
            if (socket) {
                socket.off('connect');
                socket.off('getNotification');
            }
        };
    }, [socket]);

    useEffect(() => {
        // Fetch notifications when the component mounts
        getUserNotifications().then((data) => {
            setNotification(data);
        });
    }, []);

    const handleSeenNoti = async (noti: UserNotification) => {
        setNotification((prevNotifications) =>
            prevNotifications.map((notificationItem) => {
                if (notificationItem._id === noti._id) {
                    if (notificationItem.seen.includes(user.aud))
                        return notificationItem;
                    notificationItem.seen.push(user.aud);
                    return notificationItem;
                }
                return notificationItem;
            })
        );
        await markNotificationAsSeen(noti._id);
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button className="focus:outline-none">
                            <Bell size={24} />
                        </button>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                            {notification.filter(
                                (noti) => !noti.seen.includes(user.aud)
                            ).length > 9
                                ? '9+'
                                : notification.filter(
                                      (noti) => !noti.seen.includes(user.aud)
                                  ).length}
                        </span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[25rem]">
                <DropdownMenuLabel>My Notification</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-72 rounded-md border p-2">
                    {notification.length === 0 && (
                        <div className="flex items-center justify-center h-72">
                            No notification
                        </div>
                    )}
                    {notification.map((noti, index) => (
                        <Link
                            href={noti.redirectUrl}
                            key={index}
                            onClick={() => handleSeenNoti(noti)}
                        >
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <div className="flex justify-start items-center gap-1">
                                        <Dot
                                            size={30}
                                            className={cn(
                                                !noti.seen.includes(user.aud)
                                                    ? 'text-primary'
                                                    : 'text-background'
                                            )}
                                        />
                                        <div
                                            className={cn(
                                                'flex flex-col',
                                                noti.seen.includes(user.aud) &&
                                                    'text-slate-600'
                                            )}
                                        >
                                            <div className="flex gap-2">
                                                <Avatar className="border-solid border-sky-500 border-2 w-[40px] h-[40px]">
                                                    <AvatarImage
                                                        src={
                                                            noti?.user?.img ||
                                                            '/avatar/noavatar.png'
                                                        }
                                                        alt="picture"
                                                    />
                                                    <AvatarFallback>
                                                        {'A'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col justify-around">
                                                    <p className="text-sm font-medium leading-none">
                                                        {noti?.user?.fullName} (
                                                        {noti?.user?.username})
                                                    </p>
                                                    <p className="text-xs leading-none ">
                                                        {noti?.user?.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="mt-2">
                                                {noti.content || 'No content'}
                                            </span>
                                            {/*getFormatDistanceToNow*/}
                                            <div className="text-xs text-slate-400 mt-2">
                                                {noti.createdAt &&
                                                    getFormatDistanceToNow(
                                                        noti.createdAt
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                        </Link>
                    ))}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
