"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function CreateUserPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) {
         await Swal.fire({
           icon: 'error',
           title: 'Something went wrong',
           text: error.message,
           confirmButtonColor: '#d33'
         });
        return;
      }

      if (!data.user) {
        await Swal.fire({
          icon: 'error',
          title: 'User creation failed',
          text: 'Please try again.'
        });
        return;
      }

      const { error: profileError } = await supabase
          .from("users")
          .insert([
            {
              id: data.user.id,
              username: form.username,
              email: form.email,
              role: form.role,
            },
          ]);

      if (profileError) {
        await Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: profileError.message,
          confirmButtonColor: '#d33'
        });
        return;
      }

      await Swal.fire({
        title: "Success!",
        text: "Registration successful",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });

      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          placeholder="Username"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create
        </button>
      </form>
    </div>
  );
}
