"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import "../../globals.css";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        console.error('Login error:', error);

        let errorMessage = error.message;

        // Provide helpful message for common errors
        if (error.message === 'Invalid login credentials') {
          errorMessage = 'Invalid email or password. If you just registered, please check your email to confirm your account.';
        } else if (error.message === 'Email not confirmed') {
          errorMessage = 'Please confirm your email address. Check your inbox for the confirmation link.';
        }

        await Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
          confirmButtonColor: '#d33'
        });
        return;
      }

      // Check if user was returned
      if (!data.user) {
        await Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'No user data returned. Please try again.',
          confirmButtonColor: '#d33'
        });
        return;
      }

      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Login successful',
        confirmButtonColor: '#3085d6',
        timer: 1500,
        showConfirmButton: false
      });

      const { data: profile } = await supabase
          .from("users")
          .select("role")
          .eq("id", data.user.id)
          .single();

      if (profile?.role === "admin") {
        router.push("/users");
      } else {
        router.push("/");
      }

    } catch (err) {
      setLoading(false);
      console.error('Unexpected error:', err);

      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again.',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full border rounded p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full border rounded p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
