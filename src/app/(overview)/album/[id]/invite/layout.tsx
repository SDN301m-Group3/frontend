import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Accept Invite to Album',
    description: 'Accept Invite to Album',
};

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
