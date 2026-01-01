"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("admin_token", data.token);
      localStorage.setItem(
        "admin_token_exp",
        String(Date.now() + 60 * 60 * 1000)
      );

      // small delay for smoother UX
      setTimeout(() => {
        router.push("/admin");
      }, 600);
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2B41B0]/10 via-white to-[#7E57C2]/10 px-4">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow-xl"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#2B41B0]/10 text-[#2B41B0]">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-[#2B41B0]">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}

        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-[#2B41B0]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-[#2B41B0]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2B41B0] py-2.5 text-white font-semibold disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in…
            </>
          ) : (
            "Login"
          )}
        </motion.button>
      </motion.form>
    </div>
  );
}
