import { UserAuthRegisterForm } from '@/components/auth/register/user-auth-register-form';
import { Metadata } from 'next';
import { Suspense } from 'react';

import React from 'react';

export const metadata: Metadata = {
    title: 'Register',
    description: 'Register page description',
};

export default function RegisterPage() {
    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-primary">
                    Register your account
                </h1>
            </div>
            <div className="grid gap-6">
                <Suspense
                    fallback={
                        <div className="text-center">Load register form...</div>
                    }
                >
                    <UserAuthRegisterForm />
                </Suspense>
                {/* <OtherLoginMethod /> */}
            </div>
        </>
    );
}
