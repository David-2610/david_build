"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	async function handleLogin(e: React.FormEvent) {
		e.preventDefault();

		const res = await fetch("/api/admin/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();

		if (res.ok) {
			localStorage.setItem("admin_token", data.token);
			localStorage.setItem(
				"admin_token_exp",
				String(Date.now() + 60 * 60 * 1000)
			);

			window.location.href = "/admin";
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center">
			<form
				onSubmit={handleLogin}
				className="w-full max-w-sm rounded-xl border p-6 shadow-lg"
			>
				<h1 className="text-xl font-bold mb-4">Admin Login</h1>

				{error && <p className="mb-3 text-red-500">{error}</p>}

				<input
					type="email"
					placeholder="Email"
					className="w-full mb-3 border rounded px-3 py-2"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="password"
					placeholder="Password"
					className="w-full mb-4 border rounded px-3 py-2"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className="w-full bg-[#2B41B0] text-white py-2 rounded">
					Login
				</button>
			</form>
		</div>
	);
}
