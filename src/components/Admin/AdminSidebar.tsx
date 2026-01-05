"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include", // ✅ send cookie
      });
    } finally {
      // ✅ Always redirect — backend decides auth truth
      router.replace("/admin/login");
    }
  }

  function navLink(href: string, label: string) {
    const active = pathname === href || pathname.startsWith(href + "/");

    return (
      <Link
        href={href}
        className={`block rounded px-3 py-2 text-sm font-medium ${
          active
            ? "bg-gray-200 text-black"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {label}
      </Link>
    );
  }

  return (
    <aside className="w-64 border-r bg-white p-4 flex flex-col">
      <h2 className="mb-6 text-lg font-semibold">Admin</h2>

      <nav className="flex-1 space-y-1">
        {navLink("/admin", "Dashboard")}
        {navLink("/admin/projects", "Projects")}
        {navLink("/admin/blogs", "Blogs")}
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="mt-4 rounded bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
      >
        {loggingOut ? "Logging out…" : "Logout"}
      </button>
      </nav>

    </aside>
  );
}
