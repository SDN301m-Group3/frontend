import UserAuthLoginForm from '@/components/auth/login/user-auth-login-form';
// import OtherLoginMethod from '@/components/auth/login/other-login-method';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to your account',
};

export default function LoginPage({
    searchParams,
}: {
    searchParams: { message?: string };
}) {
    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-primary">
                    Login
                </h1>
            </div>
            <div className="grid gap-6">
                <Suspense
                    fallback={
                        <div className="text-center">Load form login...</div>
                    }
                >
                    <UserAuthLoginForm message={searchParams.message} />
                </Suspense>
                {/* <Suspense
                    fallback={
                        <div className="text-center">
                            Đang tải chức năng login khác...
                        </div>
                    }
                >
                    <OtherLoginMethod />
                </Suspense> */}
            </div>
        </>
    );
}
