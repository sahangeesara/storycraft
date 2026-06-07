"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ProOnly({
                                    children,
                                }: {
    children: React.ReactNode;
}) {
    const [isPro, setIsPro] = useState<boolean | null>(null); // null means "still loading"
    const [hasUser, setHasUser] = useState<boolean>(false);

    useEffect(() => {
        const checkSubscription = async () => {
            // 1. Get the authenticated user straight from the browser context
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setHasUser(false);
                setIsPro(false);
                return;
            }

            setHasUser(true);

            // 2. Query your exact 'is_pro' boolean column
            const { data } = await supabase
                .from("users")
                .select("is_pro")
                .eq("id", user.id)
                .single();

            setIsPro(!!data?.is_pro);
        };

        checkSubscription();
    }, []);

    // --- LOADING STATE ---
    // Prevents UI flashing while checking authentication status
    if (isPro === null) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // --- 1. NOT LOGGED IN VIEW ---
    if (!hasUser) {
        return (
            <div className="min-h-[60vh] w-full flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm text-center">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mx-auto mb-5">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                        Welcome to StoryCraft
                    </h1>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        Please log in or create an account to view our premium platform features and developer insights.
                    </p>
                    <div className="space-y-3">
                        <Link
                            href="/auth/login"
                            className="block w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-500 transition-colors shadow-sm text-sm"
                        >
                            Sign In to Your Account
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // --- 2. LOGGED IN BUT NOT PRO VIEW ---
    if (!isPro) {
        return (
            <div className="min-h-[60vh] w-full flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm text-center">
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mx-auto mb-5">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                        Pro Exclusive Space
                    </h1>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        Your free account does not have authorization here. Upgrade your subscription plan to unlock full dashboard access.
                    </p>
                    <Link
                        href="/subscription"
                        className="block w-full py-3 px-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm text-sm"
                    >
                        Upgrade to Pro Account
                    </Link>
                </div>
            </div>
        );
    }

    // --- 3. LOGGED IN AND IS PRO (ACCESS GRANTED) ---
    return <>{children}</>;
}
