"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  CreditCard,
  FileCheck,
  ImageIcon,
  LayoutDashboard,
  Link2,
  Megaphone,
  Settings,
  Sparkles,
  User,
  X,
} from "lucide-react";

type DashboardSidebarProps = {
  open?: boolean;
  onClose?: () => void;
};

const primaryNavigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Campaigns",
    href: "/campaigns",
    icon: Megaphone,
  },
  {
    label: "Connections",
    href: "/connections",
    icon: Link2,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

const manageNavigation = [
  {
    label: "Catalogue",
    href: "/catalogue",
    icon: ImageIcon,
  },
  {
    label: "Content Review",
    href: "/content",
    icon: FileCheck,
  },
  {
    label: "Content Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "Subscription",
    href: "/subscription",
    icon: CreditCard,
  },
];

export function DashboardSidebar({
  open = false,
  onClose = () => {},
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-[230px] flex-col",
          "border-r border-neutral-200 bg-white",
          "transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
        ].join(" ")}
      >
        {/* Brand */}
        <div className="flex h-[62px] items-center justify-between border-b border-neutral-200 px-5">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-white">
              <Sparkles size={15} strokeWidth={2.2} />
            </div>

            <span className="text-[15px] font-semibold tracking-[-0.02em] text-neutral-950">
              Marketing System
            </span>
          </Link>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-2 text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-500">
            Workspace
          </p>

          {/* Workspace selector */}
          <button className="mb-4 flex h-10 w-full items-center justify-between rounded-xl bg-neutral-950 px-3 text-left text-sm text-white">
            <span className="truncate">Your workspace</span>

            <ChevronDown
              size={15}
              className="shrink-0 text-neutral-400"
            />
          </button>

          {/* Primary navigation */}
          <nav className="space-y-1">
            {primaryNavigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={[
                    "flex h-10 items-center gap-3 rounded-lg px-3 text-[14px] transition-colors",
                    active
                      ? "bg-neutral-100 font-medium text-neutral-950"
                      : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950",
                  ].join(" ")}
                >
                  <Icon size={17} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <p className="mb-3 mt-8 px-2 text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-500">
            Manage
          </p>

          {/* Manage navigation */}
          <nav className="space-y-1">
            {manageNavigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={[
                    "flex h-10 items-center gap-3 rounded-lg px-3 text-[14px] transition-colors",
                    active
                      ? "bg-neutral-100 font-medium text-neutral-950"
                      : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950",
                  ].join(" ")}
                >
                  <Icon size={17} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-200 p-3">
          <Link
            href="/settings"
            onClick={onClose}
            className={[
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive("/settings")
                ? "bg-neutral-100 font-medium text-neutral-950"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950",
            ].join(" ")}
          >
            <Settings size={17} strokeWidth={1.8} />
            Settings
          </Link>

          <Link
            href="/profile"
            onClick={onClose}
            className="mt-2 flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-neutral-50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-xs font-medium">
              AM
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-neutral-900">
                Alex Morgan
              </p>

              <p className="truncate text-[11px] text-neutral-500">
                Workspace Owner
              </p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}