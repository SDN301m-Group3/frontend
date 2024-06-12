import LogoSite from '@/components/overview/logo-site';
import { MainNav } from './main-nav';
// import { SideBarMobile } from './side-bar-mobile/side-bar-mobile';
// import { auth } from '@/lib/auth';
import { ModeToggle } from './mode-toggle';
// import CategoryList from './category-list';
// import { getCategories } from '@/lib/data';
import ButtonLogin from './button-login';
import { getUser } from '@/lib/action';
import { User } from '@/lib/define';
import { UserNav } from './user-nav';
import ButtonJoin from './join/button-join';
import { SideBarMobile } from './side-bar-mobile/side-bar-mobile';
import Notification from './notification';

export default async function HeaderSite() {
    // const session = true;
    // const categories = await getCategories();

    const user = (await getUser()) as User;

    return (
        <header className="md:px-12 sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4 relative">
                <div className="md:mr-4 md:flex">
                    <LogoSite />
                    {/* <CategoryList categories={categories} /> */}
                </div>

                <div className="ml-auto hidden sm:block">
                    <div className="flex items-center space-x-4 ">
                        {user ? (
                            <>
                                <ButtonJoin />
                                <Notification user={user} />
                            </>
                        ) : (
                            <MainNav className="mx-6 hidden lg:flex" />
                        )}
                        <ModeToggle />

                        {user ? <UserNav user={user} /> : <ButtonLogin />}
                    </div>
                </div>
                <div className="ml-auto block sm:hidden">
                    <SideBarMobile user={user} />
                </div>
            </div>
        </header>
    );
}
