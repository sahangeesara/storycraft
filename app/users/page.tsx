"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import "../globals.css";

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");

    if (!error) setUsers(data || []);
    setLoading(false);
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
        router.push("/blog");
        return;
      }

      await fetchUsers();
    };

    checkAdminAndLoadUsers().then(r => r);
  }, []);

  const deleteUser = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("users")
      .delete()
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

    setUsers((prev) =>
      prev.filter((user) => user.id !== id)
    );
  };
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>

        <Link
          href="/users/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create User
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Created
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.username}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${user.role === "admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/users/edit/${user.id}`}
                        className="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
    </div>

  );
}
