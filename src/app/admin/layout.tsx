"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/lib/adminAuth";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Home,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: <FolderKanban className="h-4 w-4" />,
  },
  {
    label: "Blogs",
    href: "/admin/blogs",
    icon: <FileText className="h-4 w-4" />,
    disabled: true,
  },
  {
    label: "Homepage",
    href: "/",
    icon: <Home className="h-4 w-4" />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 border-r bg-white px-4 py-6 flex flex-col">
        {/* Admin Info */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">Logged in as</p>
          <p className="font-semibold text-[#2B41B0]">
            David Tembhare
          </p>
          <p className="text-xs text-gray-400">
            admin@portfolio.com
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.disabled ? "#" : item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[#2B41B0]/10 text-[#2B41B0]"
                    : "text-gray-600 hover:bg-gray-100"
                } ${
                  item.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={adminLogout}
          className="mt-6 flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
