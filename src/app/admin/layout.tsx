"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, logout } = useAdminAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-4 py-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/admin")}>
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/admin/projects")}>
            Projects
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/admin/blogs")}>
            Blogs
          </Button>
        </nav>

        <Separator className="my-6" />

        <Button variant="destructive" className="w-full" onClick={logout}>
          Logout
        </Button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
