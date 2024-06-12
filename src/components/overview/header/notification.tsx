'use client';

import { Bell, Cloud } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@/lib/define';
import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSocket } from '@/components/socket-io-provider';

export default function Notification({ user }: { user: User }) {
    const { socket } = useSocket();
    const [notification, setNotification] = useState<any[]>([]);

    // useEffect(() => {
    //     // const socketIoUrl = process.env.SOCKET_IO_URL as string;
    //     setSocket(io('http://localhost:8080'));
    // }, []);

    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                socket.on('getNotification', (data: any) => {
                    setNotification(prev => [data, ...prev]);
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
    }, [socket, user]);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button className="focus:outline-none">
                            <Bell size={24} />
                        </button>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                            {notification.length > 9
                                ? '9+'
                                : notification.length}
                        </span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Notification</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-72 rounded-md border p-2">
                    {notification.length === 0 && (
                        <div className="flex items-center justify-center h-72">
                            No notification
                        </div>
                    )}
                    {notification.map((item, index) => (
                        <div key={index}>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Cloud className="mr-2 h-4 w-4" />
                                    <span>{item.sender.fullName}</span>
                                    <DropdownMenuShortcut>
                                        {item.type || 'Unknown'}
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                        </div>
                    ))}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
