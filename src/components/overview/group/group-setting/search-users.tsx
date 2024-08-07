'use client';

import * as React from 'react';
import { Check, CheckCircle, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { SearchUser } from '@/lib/define';
import { getUser, getUsers, inviteUserToGroup } from '@/lib/action';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/icons/icons';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { useSocket } from '@/components/socket-io-provider';
import { getGroupInfo } from '@/lib/data';

const frameworks = [
    {
        value: 'next.js',
        label: 'Next.js',
    },
    {
        value: 'sveltekit',
        label: 'SvelteKit',
    },
    {
        value: 'nuxt.js',
        label: 'Nuxt.js',
    },
    {
        value: 'remix',
        label: 'Remix',
    },
    {
        value: 'astro',
        label: 'Astro',
    },
];

export function SearchUsers({ groupId }: { groupId: string }) {
    const { socket } = useSocket();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const [users, setUsers] = React.useState([] as SearchUser[]);
    const [user, setUser] = React.useState<SearchUser | null>(null);

    const handleValueChange = (value: string) => {
        setInputValue(value);
        setOpen(!!value);
    };

    const handleInvite = async () => {
        setIsLoading(true);
        // send invite
        const result = await inviteUserToGroup(groupId, value);
        if (!result?.isSuccess) {
            toast.error(result?.error);
        } else {
            if (socket && result?.data?.receivers) {
                socket.emit(`sendNotification`, result?.data);
            }
            toast.success('Invite successfully');
        }
        setIsLoading(false);
    };

    React.useEffect(() => {
        if (inputValue === '') {
            setUsers([]);
            return;
        }

        // Set a delay for the getUsers call
        const delayDebounceFn = setTimeout(() => {
            getUsers(inputValue).then((users) => {
                setUsers(users);
            });
        }, 500); // 500ms delay

        // Clear the timeout if inputValue changes before the delay is over
        return () => clearTimeout(delayDebounceFn);
    }, [inputValue]);

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between"
                    >
                        {value
                            ? users.find(
                                  (user) =>
                                      user.email === value ||
                                      user.username === value
                              )?.email
                            : 'Invite group members...'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full">
                    <Command>
                        <CommandInput
                            placeholder="Search users..."
                            onValueChange={handleValueChange}
                        />
                        <CommandList>
                            <CommandEmpty>No user found</CommandEmpty>
                            <CommandGroup>
                                {users.map((user) => (
                                    <CommandItem
                                        key={user._id}
                                        value={user.email}
                                        onSelect={(currentValue) => {
                                            setValue(
                                                currentValue === value
                                                    ? ''
                                                    : currentValue
                                            );
                                            setUser(user);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                value === user.email
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                        <div key={user._id} className="mb-2">
                                            <div className="flex gap-2">
                                                <Avatar className="border-solid border-sky-500 border-2 w-[40px] h-[40px]">
                                                    <AvatarImage
                                                        src={
                                                            user.img ||
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
                                                        {user.fullName}
                                                    </p>
                                                    <p className="text-xs leading-none text-muted-foreground">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Button
                type="submit"
                disabled={isLoading || !value}
                variant="default"
                onClick={handleInvite}
            >
                {isLoading && (
                    <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                )}
                Invite
            </Button>
        </>
    );
}
