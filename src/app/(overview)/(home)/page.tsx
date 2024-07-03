import GroupList from '@/components/overview/home/group/group-list';
import LandingPage from '@/components/overview/home/landing-page/landing-page';
import { RecentViewList } from '@/components/overview/home/recent-view/recent-view-list';
import SpinLoading from '@/components/shared/spin-loading';
import { getUser } from '@/lib/action';
import { Suspense } from 'react';

const message = [
    [0, 4, 'Good night'],
    [5, 11, 'Good morning'],
    [12, 17, 'Good afternoon'],
    [18, 24, 'Good night'],
];

export default async function Home() {
    const user = await getUser();
    const getGreeting = () => {
        let hour: number = new Date().getHours();
        for (let i = 0; i < message.length; i++) {
            if (
                hour >= Number(message[i][0]) &&
                hour <= Number(message[i][1])
            ) {
                return message[i][2];
            }
        }
    };
    return (
        <>
            {user ? (
                <div>
                    <div className="w-full text-center mb-5">
                        <h1 className="text-2xl font-bold">
                            {getGreeting()}, {user.fullName}
                        </h1>
                        <p className="mt-2">
                            Keep all your group’s photos safe, organized, and
                            accessible anytime.
                        </p>
                    </div>
                    <span className={`text-2xl font-bold`}>My Group</span>
                    <Suspense fallback={<SpinLoading />}>
                        <GroupList />
                    </Suspense>
                    <span className={`text-2xl font-bold`}>Recent View</span>
                    <Suspense fallback={<SpinLoading />}>
                        <RecentViewList />
                    </Suspense>
                </div>
            ) : (
                <LandingPage />
            )}
        </>
    );
}
