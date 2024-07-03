import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing',
    description: 'Pricing page',
};

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
