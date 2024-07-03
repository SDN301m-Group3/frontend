import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Accept Invite to Group',
    description: 'Accept Invite to Group',
};

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
