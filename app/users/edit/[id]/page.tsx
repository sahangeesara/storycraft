"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "../../../globals.css";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setForm({
          username: data.username,
          email: data.email,
          role: data.role,
        });
      }
    };

    loadUser();
  }, [id]);

  const updateUser = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const { error } = await supabase
      .from("users")
      .update(form)
      .eq("id", id);

    if (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
            confirmButtonColor: '#d33'
        });
      return;
    }

      await Swal.fire({
          icon: 'success',
          title: 'User updated',
          text: 'The user details were updated successfully.'
      });
    router.push("/users");
  };


    useEffect(() => {
        const checkAdminAndLoadUsers = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.push("/auth/login");
                return;
            }

            const { data: profile, error } = await supabase
                .from("users")
                .select("role")
                .eq("id", user.id)
                .single();

            if (error || profile?.role !== "admin") {
                router.push("/");
                return;
            }
        };

        checkAdminAndLoadUsers().then(r => r);
    }, []);



    return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Edit User
      </h1>

      <form
        onSubmit={updateUser}
        className="space-y-4"
      >
        <input
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }
          className="w-full rounded border p-2"
        />

        <input
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          className="w-full rounded border p-2"
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
          className="w-full rounded border p-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
