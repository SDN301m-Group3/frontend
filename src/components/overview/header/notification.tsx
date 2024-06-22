'use client';

import { Bell } from 'lucide-react';

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
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Notification({ user }: { user: User }) {
    const router = useRouter();
    const { socket } = useSocket();
    const [notification, setNotification] = useState<UserNotification[]>([]);

    // useEffect(() => {
    //     // const socketIoUrl = process.env.SOCKET_IO_URL as string;
    //     setSocket(io('http://localhost:8080'));
    // }, []);

    useEffect(() => {
        if (socket) {
            socket.on('getNotification', (data: any) => {
                getUserNotifications().then((data) => {
                    console.log(data);
                    setNotification(data);
                });
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

    const handleSeenNoti = async (notiId: UserNotification) => {
        if (notiId.seen) return;
        await markNotificationAsSeen(notiId._id);
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
                            {notification.filter((noti) => !noti.seen).length >
                            9
                                ? '9+'
                                : notification.filter((noti) => !noti.seen)
                                      .length}
                        </span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80">
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
                                    <div
                                        className={cn(
                                            'flex flex-col',
                                            noti.seen && 'text-slate-600'
                                        )}
                                    >
                                        <div className="flex gap-2">
                                            <Avatar className="border-solid border-sky-500 border-2 w-[40px] h-[40px]">
                                                <AvatarImage
                                                    src={
                                                        user?.img ||
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
                                                    {user?.fullName} (
                                                    {user?.username})
                                                </p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="mt-2">
                                            {noti.content || 'No content'}
                                        </span>
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
