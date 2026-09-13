"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Database,
  Edit3,
  Globe2,
  Image,
  Instagram,
  Layers3,
  MoreHorizontal,
  Package,
  PauseCircle,
  ShieldCheck,
  Trash2,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";

type BusinessStatus = "Active" | "Trial" | "Suspended";

const business = {
  id: "BUS-1001",
  name: "Growth Labs",
  owner: "Aarav Sharma",
  email: "aarav@growthlabs.com",
  phone: "+91 98765 43210",
  website: "growthlabs.example",
  plan: "Business",
  status: "Active" as BusinessStatus,
  created: "August 12, 2026",
  lastActive: "2 minutes ago",
  industry: "Marketing & Advertising",
  location: "Bengaluru, India",
  description:
    "Growth-focused digital marketing company using AI-assisted content, campaigns, and social media automation.",
};

const connections = [
  {
    name: "Instagram",
    handle: "@growthlabs",
    connected: true,
    icon: Instagram,
  },
  {
    name: "Facebook",
    handle: "Growth Labs",
    connected: true,
    icon: Globe2,
  },
  {
    name: "LinkedIn",
    handle: "Growth Labs",
    connected: true,
    icon: Globe2,
  },
  {
    name: "X",
    handle: "Not connected",
    connected: false,
    icon: Globe2,
  },
];

const activities = [
  {
    title: "Campaign scheduled",
    description: "Summer Growth Campaign scheduled for publishing.",
    time: "8 min ago",
    icon: CalendarDays,
  },
  {
    title: "Content approved",
    description: "3 AI-generated posts were approved.",
    time: "24 min ago",
    icon: CheckCircle2,
  },
  {
    title: "Catalogue updated",
    description: "8 new products were added to the catalogue.",
    time: "2 hours ago",
    icon: Package,
  },
  {
    title: "Instagram connected",
    description: "Instagram account successfully connected.",
    time: "Yesterday",
    icon: Instagram,
  },
];

const dataModules = [
  {
    title: "Products / Catalogue",
    description: "Products, pricing, descriptions and catalogue data.",
    count: "42 products",
    icon: Package,
  },
  {
    title: "Audience",
    description: "Target audiences and customer segments.",
    count: "6 segments",
    icon: Users,
  },
  {
    title: "Brand Data",
    description: "Brand voice, positioning, identity and guidelines.",
    count: "Configured",
    icon: Layers3,
  },
  {
    title: "Marketing Preferences",
    description: "Goals, platforms, content preferences and frequency.",
    count: "Configured",
    icon: BarChart3,
  },
  {
    title: "Assets",
    description: "Uploaded images, videos and campaign media.",
    count: "128 assets",
    icon: Image,
  },
  {
    title: "Connections",
    description: "Social media and external platform connections.",
    count: "3 connected",
    icon: Globe2,
  },
];

const statusStyles: Record<BusinessStatus, string> = {
  Active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Trial: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Suspended: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function AdminBusinessDetailPage() {
  const [status, setStatus] = useState<BusinessStatus>(business.status);
  const [showActions, setShowActions] = useState(false);

  function toggleSuspend() {
    setStatus((current) =>
      current === "Suspended" ? "Active" : "Suspended",
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/admin/dashboard"
          className="hover:text-foreground"
        >
          Admin
        </Link>

        <ChevronRight className="h-4 w-4" />

        <Link
          href="/admin/businesses"
          className="hover:text-foreground"
        >
          Businesses
        </Link>

        <ChevronRight className="h-4 w-4" />

        <span>{business.id}</span>
      </div>

      {/* Header */}
      <div className="rounded-2xl border border-border bg-background">
        <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {business.name}
                </h1>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
                >
                  {status}
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {business.id} · {business.industry}
              </p>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>{business.location}</span>
                <span>Created {business.created}</span>
                <span>Active {business.lastActive}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
            >
              <Edit3 className="h-4 w-4" />
              Edit
            </button>

            <button
              type="button"
              onClick={toggleSuspend}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
            >
              {status === "Suspended" ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Activate
                </>
              ) : (
                <>
                  <PauseCircle className="h-4 w-4" />
                  Suspend
                </>
              )}
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowActions((value) => !value)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
                aria-label="More business actions"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>

              {showActions && (
                <div className="absolute right-0 top-11 z-20 w-48 rounded-xl border border-border bg-background p-1 shadow-lg">
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    View audit history
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-500/10 dark:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete business
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mock data warning */}
        <div className="border-t border-border bg-muted/30 px-5 py-3 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            Demo business data — backend integration will be added later.
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Campaigns"
          value="12"
          detail="4 active"
          icon={<BarChart3 className="h-4 w-4" />}
        />

        <MetricCard
          label="Products"
          value="42"
          detail="8 updated this month"
          icon={<Package className="h-4 w-4" />}
        />

        <MetricCard
          label="Team Members"
          value="8"
          detail="6 active"
          icon={<Users className="h-4 w-4" />}
        />

        <MetricCard
          label="Assets"
          value="128"
          detail="14.8 GB"
          icon={<Image className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Main column */}
        <div className="space-y-6">
          {/* Business profile */}
          <section className="rounded-2xl border border-border bg-background">
            <div className="border-b border-border p-5 sm:p-6">
              <h2 className="font-semibold">Business Profile</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Core business information.
              </p>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
              <InfoItem label="Business Name" value={business.name} />
              <InfoItem label="Business ID" value={business.id} />
              <InfoItem label="Industry" value={business.industry} />
              <InfoItem label="Location" value={business.location} />
              <InfoItem label="Owner" value={business.owner} />
              <InfoItem label="Email" value={business.email} />
              <InfoItem label="Phone" value={business.phone} />
              <InfoItem label="Website" value={business.website} />

              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground">
                  Description
                </p>
                <p className="mt-1 text-sm leading-6">
                  {business.description}
                </p>
              </div>
            </div>
          </section>

          {/* Data modules */}
          <section className="rounded-2xl border border-border bg-background">
            <div className="border-b border-border p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <h2 className="font-semibold">Business Data</h2>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                Inspect the data used by the marketing automation system.
              </p>
            </div>

            <div className="grid gap-px bg-border sm:grid-cols-2">
              {dataModules.map((module) => {
                const Icon = module.icon;

                return (
                  <button
                    key={module.title}
                    type="button"
                    className="group bg-background p-5 text-left transition-colors hover:bg-muted/40 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </div>

                    <h3 className="mt-4 text-sm font-medium">
                      {module.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {module.description}
                    </p>

                    <p className="mt-3 text-xs font-medium">
                      {module.count}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Activity */}
          <section className="rounded-2xl border border-border bg-background">
            <div className="border-b border-border p-5 sm:p-6">
              <h2 className="font-semibold">Recent Activity</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Recent activity for this business.
              </p>
            </div>

            <div className="divide-y divide-border">
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div
                    key={`${activity.title}-${activity.time}`}
                    className="flex gap-3 p-5 sm:p-6"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm font-medium">
                          {activity.title}
                        </p>

                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                      </div>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Owner */}
          <section className="rounded-2xl border border-border bg-background">
            <div className="border-b border-border p-5">
              <h2 className="font-semibold">Business Owner</h2>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                  AS
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {business.owner}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {business.email}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <InfoItem label="Role" value="Business Owner" />
                <InfoItem label="Joined" value="Aug 12, 2026" />
                <InfoItem label="Last Login" value="2 min ago" />
              </div>

              <button
                type="button"
                className="mt-5 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm font-medium hover:bg-muted"
              >
                View User
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </section>

          {/* Subscription */}
          <section className="rounded-2xl border border-border bg-background">
            <div className="border-b border-border p-5">
              <h2 className="font-semibold">Subscription</h2>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">Business</p>
                  <p className="text-xs text-muted-foreground">
                    Monthly plan
                  </p>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Active
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <UsageRow
                  label="Campaigns"
                  value="12 / 50"
                  percentage={24}
                />

                <UsageRow
                  label="Team members"
                  value="8 / 15"
                  percentage={53}
                />

                <UsageRow
                  label="Assets"
                  value="128 / 500"
                  percentage={26}
                />
              </div>

              <button
                type="button"
                className="mt-5 flex h-9 w-full items-center justify-center rounded-lg border border-border text-sm font-medium hover:bg-muted"
              >
                Manage Subscription
              </button>
            </div>
          </section>

          {/* Connections */}
          <section className="rounded-2xl border border-border bg-background">
            <div className="border-b border-border p-5">
              <h2 className="font-semibold">Connections</h2>
            </div>

            <div className="divide-y divide-border">
              {connections.map((connection) => {
                const Icon = connection.icon;

                return (
                  <div
                    key={connection.name}
                    className="flex items-center gap-3 p-4"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">
                        {connection.name}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {connection.handle}
                      </p>
                    </div>

                    {connection.connected ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    ) : (
                      <XCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Security */}
          <section className="rounded-2xl border border-border bg-background">
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">
                    Security Status
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    No security issues detected for this business in the
                    current demo data.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Back */}
          <Link
            href="/admin/businesses"
            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm font-medium hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Businesses
          </Link>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{label}</p>

        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-sm">{value}</p>
    </div>
  );
}

function UsageRow({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-foreground"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
