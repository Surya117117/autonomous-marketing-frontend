"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Ban,
  Building2,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Mail,
  Megaphone,
  MoreHorizontal,
  Shield,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserCog,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const user = {
  id: "USR-1001",
  name: "Aarav Sharma",
  email: "aarav@example.com",
  phone: "+91 98765 43210",
  company: "Growth Labs",
  plan: "Business",
  status: "Active",
  role: "Owner",
  joined: "September 08, 2026",
  lastActive: "2 minutes ago",
  campaigns: 8,
  totalPosts: 126,
  connectedAccounts: 4,
  monthlySpend: "₹4,999",
};

const recentActivity = [
  {
    title: "Created a new campaign",
    description: "September Product Launch",
    time: "12 minutes ago",
  },
  {
    title: "Connected Instagram",
    description: "Growth Labs Instagram Business",
    time: "2 hours ago",
  },
  {
    title: "Approved 6 content posts",
    description: "Campaign content review",
    time: "5 hours ago",
  },
  {
    title: "Updated marketing preferences",
    description: "Audience targeting settings",
    time: "Yesterday",
  },
];

export default function AdminUserDetailPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/users"
          className="mb-4 inline-flex items-center text-sm text-neutral-500 hover:text-neutral-950 transition"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Link>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-lg font-bold text-white shadow-md">
              AS
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
                  {user.name}
                </h1>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                  {user.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-neutral-500">
                {user.email}
              </p>

              <p className="mt-1 text-xs font-mono text-neutral-400">
                {user.id}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </Button>

            <Button variant="outline">
              <Ban className="mr-2 h-4 w-4" />
              Suspend
            </Button>

            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* KPI */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          icon={<Megaphone className="h-5 w-5 text-purple-600" />}
          label="Campaigns"
          value={user.campaigns.toString()}
        />

        <InfoCard
          icon={<CalendarDays className="h-5 w-5 text-blue-600" />}
          label="Content Posts"
          value={user.totalPosts.toString()}
        />

        <InfoCard
          icon={<Building2 className="h-5 w-5 text-emerald-600" />}
          label="Connected Accounts"
          value={user.connectedAccounts.toString()}
        />

        <InfoCard
          icon={<CreditCard className="h-5 w-5 text-amber-600" />}
          label="Monthly Spend"
          value={user.monthlySpend}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Account Information */}
        <div className="space-y-6 xl:col-span-2">
          <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-100 p-5">
              <h2 className="font-semibold text-neutral-950">Account Information</h2>
              <p className="mt-1 text-xs text-neutral-500">
                Basic account and workspace information.
              </p>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2">
              <DetailItem
                label="Full Name"
                value={user.name}
              />

              <DetailItem
                label="Email"
                value={user.email}
              />

              <DetailItem
                label="Phone"
                value={user.phone}
              />

              <DetailItem
                label="Company"
                value={user.company}
              />

              <DetailItem
                label="Plan"
                value={user.plan}
              />

              <DetailItem
                label="Role"
                value={user.role}
              />

              <DetailItem
                label="Joined"
                value={user.joined}
              />

              <DetailItem
                label="Last Active"
                value={user.lastActive}
              />
            </div>
          </section>

          {/* Activity */}
          <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-100 p-5">
              <h2 className="font-semibold text-neutral-950">Recent Activity</h2>
              <p className="mt-1 text-xs text-neutral-500">
                Latest activity from this account.
              </p>
            </div>

            <div className="divide-y divide-neutral-100">
              {recentActivity.map((activity) => (
                <div
                  key={`${activity.title}-${activity.time}`}
                  className="flex gap-4 p-5"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-50 border border-purple-100 text-purple-700">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-neutral-900">
                      {activity.title}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      {activity.description}
                    </p>

                    <p className="mt-2 text-[11px] text-neutral-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-100 p-5">
              <h2 className="font-semibold text-neutral-950">Account Controls</h2>
            </div>

            <div className="space-y-3 p-5">
              <ActionButton
                icon={<UserCog className="h-4 w-4" />}
                label="Edit User"
              />

              <ActionButton
                icon={<Shield className="h-4 w-4" />}
                label="Manage Role"
              />

              <ActionButton
                icon={<CreditCard className="h-4 w-4" />}
                label="Change Subscription"
              />

              <ActionButton
                icon={<Mail className="h-4 w-4" />}
                label="Send Password Reset"
              />

              <ActionButton
                icon={<MoreHorizontal className="h-4 w-4" />}
                label="More Actions"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-100 p-5">
              <h2 className="font-semibold text-neutral-950">Security</h2>
            </div>

            <div className="space-y-4 p-5">
              <SecurityRow
                icon={<ShieldCheck className="h-4 w-4 text-emerald-600" />}
                label="Account Status"
                value="Verified"
              />

              <SecurityRow
                icon={<UserCheck className="h-4 w-4 text-emerald-600" />}
                label="Email"
                value="Verified"
              />

              <SecurityRow
                icon={<Shield className="h-4 w-4 text-neutral-400" />}
                label="Two-Factor Auth"
                value="Not enabled"
              />
            </div>
          </section>

          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-5">
            <p className="text-sm font-semibold text-neutral-950">
              Backend integration pending
            </p>

            <p className="mt-1 text-xs leading-5 text-neutral-500">
              User actions shown here are placeholders. They will be
              connected to secure admin APIs during the API integration
              and authentication stages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-200">
        {icon}
      </div>

      <p className="mt-4 text-xs font-medium text-neutral-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-950">
        {value}
      </p>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-neutral-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-neutral-950">
        {value}
      </p>
    </div>
  );
}

function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      variant="outline"
      className="w-full justify-start"
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  );
}

function SecurityRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-200">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-neutral-900">{label}</p>
        <p className="text-xs text-neutral-500">{value}</p>
      </div>
    </div>
  );
}
