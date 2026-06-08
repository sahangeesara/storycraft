"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProRedirect() {
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) return;

            const { data, error } = await supabase
                .from("users")
                .select("is_pro")
                .eq("id", user.id)
                .single();

            if (error) {
                console.error(error);
                return;
            }

            if (data?.is_pro) {
                router.replace("/blog/pro");
            }
        };

        checkUser();
    }, [router]);

    return null;
}
