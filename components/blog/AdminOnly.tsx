"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminOnly({
                                      children,
                                  }: {
    children: React.ReactNode;
}) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkRole = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) return;

            const { data } = await supabase
                .from("users")
                .select("role")
                .eq("id", user.id)
                .single();

            setIsAdmin(data?.role === "admin");
        };

        checkRole();
    }, []);

    if (!isAdmin) return null;

    return <>{children}</>;
}
