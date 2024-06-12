'use client';

import { useSocket } from '@/components/socket-io-provider';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/define';
import { useEffect } from 'react';

export default function BtnSendNotiDemo({ user }: { user: User }) {
    const { socket } = useSocket();

    const handleNotification = (type: string) => () => {
        if (socket) {
            socket.emit(`sendNotification`, {
                sender: user,
                type: type,
            });
        }
    };

    useEffect(() => {}, [socket, user]);
    return (
        <Button variant="default" onClick={handleNotification('demo')}>
            Send Notification
        </Button>
    );
}
