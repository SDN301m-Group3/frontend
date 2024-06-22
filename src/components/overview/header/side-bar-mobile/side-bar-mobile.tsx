import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { logout } from '@/lib/action';
import { ModeToggle } from '../mode-toggle';
import { User } from '@/lib/define';

type PageProps = {
    label: string;
    path: string;
};

const pages: PageProps[] = [
    {
        label: 'Abous Us',
        path: '/about-us',
    },
];

export function SideBarMobile({ user }: { user: User }) {
    if (!user) {
        return (
            <Button asChild>
                <Link href={'/login'}>Login</Link>
            </Button>
        );
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="hidden">
                    <HamburgerMenuIcon className="w-5 h-5" />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col ">
                <div>
                    {user && (
                        <SheetHeader>
                            <SheetTitle className="flex justify-center">
                                <Avatar className="h-[80px] w-[80px] border-[3px] border-sky-500">
                                    <AvatarImage
                                        src={
                                            user?.img || '/avatar/noavatar.png'
                                        }
                                        alt="avatar picture"
                                        width={100}
                                        height={100}
                                    />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                            </SheetTitle>
                            <SheetDescription>{user.fullName}</SheetDescription>
                        </SheetHeader>
                    )}
                    <div className="flex justify-center my-2">
                        <ModeToggle />
                    </div>

                    <div className="flex flex-col justify-center">
                        {pages.map((page) => (
                            <Link
                                key={page.path}
                                href={page.path}
                                className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                            >
                                <>
                                    <div className="text-center">
                                        <Separator className="my-2" />
                                        {page.label}

                                        <Separator className="my-2" />
                                    </div>
                                </>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="text-center">
                    <Button asChild>
                        <Link href={'/logout'}>Logout</Link>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
