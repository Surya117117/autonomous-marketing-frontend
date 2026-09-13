"use client";

import { usePathname } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Exclude AdminShell layout for login route
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-neutral-950 text-white font-sans">{children}</div>;
  }

  return <AdminShell>{children}</AdminShell>;
}
