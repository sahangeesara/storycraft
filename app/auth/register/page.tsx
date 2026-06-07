"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
          title: 'Oops...',
          text: error.message,
          confirmButtonColor: '#d33'
        });
        return;
      }

      if (!data.user) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'User creation failed'
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
              password: form.password,
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
      await Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: 'Please try again.'
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Register
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
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
          disabled
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
