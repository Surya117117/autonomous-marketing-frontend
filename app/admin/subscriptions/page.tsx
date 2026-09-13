"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  DollarSign,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

type SubscriptionStatus =
  | "Active"
  | "Trial"
  | "Past Due"
  | "Cancelled";

type Plan = "Starter" | "Growth" | "Scale" | "Enterprise";

type Subscription = {
  id: string;
  customer: string;
  email: string;
  business: string;
  plan: Plan;
  status: SubscriptionStatus;
  amount: number;
  billing: "Monthly" | "Yearly";
  started: string;
  renewal: string;
  users: number;
};

const subscriptions: Subscription[] = [
  {
    id: "SUB-1001",
    customer: "Aarav Sharma",
    email: "aarav@example.com",
    business: "Beyond Stories",
    plan: "Growth",
    status: "Active",
    amount: 2499,
    billing: "Monthly",
    started: "12 Aug 2026",
    renewal: "12 Oct 2026",
    users: 4,
  },
  {
    id: "SUB-1002",
    customer: "Meera Kapoor",
    email: "meera@example.com",
    business: "Urban Bloom",
    plan: "Scale",
    status: "Active",
    amount: 6999,
    billing: "Monthly",
    started: "04 Jul 2026",
    renewal: "04 Oct 2026",
    users: 8,
  },
  {
    id: "SUB-1003",
    customer: "Rohan Mehta",
    email: "rohan@example.com",
    business: "Mehta Fitness",
    plan: "Starter",
    status: "Trial",
    amount: 999,
    billing: "Monthly",
    started: "08 Sep 2026",
    renewal: "15 Sep 2026",
    users: 2,
  },
  {
    id: "SUB-1004",
    customer: "Ishita Verma",
    email: "ishita@example.com",
    business: "Glow Studio",
    plan: "Growth",
    status: "Active",
    amount: 2499,
    billing: "Monthly",
    started: "18 Jun 2026",
    renewal: "18 Oct 2026",
    users: 5,
  },
  {
    id: "SUB-1005",
    customer: "Kabir Singh",
    email: "kabir@example.com",
    business: "Northstar Labs",
    plan: "Enterprise",
    status: "Active",
    amount: 14999,
    billing: "Monthly",
    started: "22 May 2026",
    renewal: "22 Oct 2026",
    users: 21,
  },
  {
    id: "SUB-1006",
    customer: "Ananya Rao",
    email: "ananya@example.com",
    business: "The Green Table",
    plan: "Growth",
    status: "Past Due",
    amount: 2499,
    billing: "Monthly",
    started: "02 Mar 2026",
    renewal: "02 Oct 2026",
    users: 3,
  },
  {
    id: "SUB-1007",
    customer: "Dev Malhotra",
    email: "dev@example.com",
    business: "Pixel House",
    plan: "Scale",
    status: "Cancelled",
    amount: 6999,
    billing: "Monthly",
    started: "15 Jan 2026",
    renewal: "15 Sep 2026",
    users: 9,
  },
];

const planStyles: Record<Plan, string> = {
  Starter: "bg-muted text-muted-foreground",
  Growth: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Scale: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Enterprise: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

const statusStyles: Record<SubscriptionStatus, string> = {
  Active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Trial: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Past Due": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Cancelled: "bg-red-500/10 text-red-600 dark:text-red-400",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AdminSubscriptionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((subscription) => {
      const query = search.toLowerCase();

      const matchesSearch =
        subscription.customer.toLowerCase().includes(query) ||
        subscription.email.toLowerCase().includes(query) ||
        subscription.business.toLowerCase().includes(query) ||
        subscription.id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || subscription.status === statusFilter;

      const matchesPlan =
        planFilter === "All" || subscription.plan === planFilter;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [search, statusFilter, planFilter]);

  const activeCount = subscriptions.filter(
    (item) => item.status === "Active",
  ).length;

  const trialCount = subscriptions.filter(
    (item) => item.status === "Trial",
  ).length;

  const pastDueCount = subscriptions.filter(
    (item) => item.status === "Past Due",
  ).length;

  const mrr = subscriptions
    .filter((item) => item.status === "Active")
    .reduce((total, item) => total + item.amount, 0);

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <CreditCard className="h-4 w-4" />
            Billing
            <span>/</span>
            Subscriptions
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Subscriptions
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage plans, billing status, renewals, and customer
            subscriptions.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:opacity-90">
          <Sparkles className="h-4 w-4" />
          Create Subscription
        </button>
      </div>

      {/* Mock notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-dashed border-border bg-muted/30 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="text-sm font-medium">Admin billing preview</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Subscription records shown here are mock data. Real billing
            provider integration will be connected during Admin API
            Integration.
          </p>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Monthly Recurring Revenue"
          value={formatCurrency(mrr)}
          change="+12.8%"
          positive
          icon={<DollarSign className="h-5 w-5" />}
        />

        <MetricCard
          label="Active Subscriptions"
          value={activeCount.toString()}
          change="+8.4%"
          positive
          icon={<CheckCircle2 className="h-5 w-5" />}
        />

        <MetricCard
          label="Trials"
          value={trialCount.toString()}
          change="+4.1%"
          positive
          icon={<Users className="h-5 w-5" />}
        />

        <MetricCard
          label="Past Due"
          value={pastDueCount.toString()}
          change="-2.3%"
          positive
          icon={<CalendarDays className="h-5 w-5" />}
        />
      </div>

      {/* Plan distribution */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-5">
          <h2 className="font-semibold">Plan Distribution</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Current subscription mix across the platform.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {(["Starter", "Growth", "Scale", "Enterprise"] as Plan[]).map(
            (plan) => {
              const count = subscriptions.filter(
                (item) => item.plan === plan,
              ).length;

              return (
                <div
                  key={plan}
                  className="rounded-xl border border-border p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${planStyles[plan]}`}
                    >
                      {plan}
                    </span>
                    <span className="text-lg font-semibold">{count}</span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-foreground"
                      style={{
                        width: `${Math.max(
                          8,
                          (count / subscriptions.length) * 100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-2xl border border-border bg-card p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search customer, business, email, or subscription ID..."
              className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-4 text-sm outline-none transition focus:border-foreground"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-10 rounded-xl border border-border bg-background px-3 text-sm outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Trial">Trial</option>
            <option value="Past Due">Past Due</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={planFilter}
            onChange={(event) => setPlanFilter(event.target.value)}
            className="h-10 rounded-xl border border-border bg-background px-3 text-sm outline-none"
          >
            <option value="All">All Plans</option>
            <option value="Starter">Starter</option>
            <option value="Growth">Growth</option>
            <option value="Scale">Scale</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
      </section>

      {/* Desktop table */}
      <section className="hidden overflow-hidden rounded-2xl border border-border bg-card lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-4 font-medium">Customer</th>
                <th className="px-5 py-4 font-medium">Plan</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Billing</th>
                <th className="px-5 py-4 font-medium">Renewal</th>
                <th className="px-5 py-4 text-right font-medium">Amount</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredSubscriptions.map((subscription) => (
                <tr
                  key={subscription.id}
                  className="transition hover:bg-muted/20"
                >
                  <td className="px-5 py-4">
                    <div className="font-medium">{subscription.customer}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {subscription.business} · {subscription.email}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${planStyles[subscription.plan]}`}
                    >
                      {subscription.plan}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[subscription.status]}`}
                    >
                      {subscription.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div>{subscription.billing}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {subscription.users} seats
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {subscription.renewal}
                  </td>

                  <td className="px-5 py-4 text-right font-medium">
                    {formatCurrency(subscription.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <button className="rounded-lg p-2 transition hover:bg-muted">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination count={filteredSubscriptions.length} />
      </section>

      {/* Mobile cards */}
      <section className="space-y-3 lg:hidden">
        {filteredSubscriptions.map((subscription) => (
          <article
            key={subscription.id}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-medium">{subscription.customer}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {subscription.business}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[subscription.status]}`}
              >
                {subscription.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <InfoItem label="Plan" value={subscription.plan} />
              <InfoItem
                label="Amount"
                value={formatCurrency(subscription.amount)}
              />
              <InfoItem label="Billing" value={subscription.billing} />
              <InfoItem label="Renewal" value={subscription.renewal} />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">
                {subscription.id}
              </span>

              <button className="rounded-lg p-2 hover:bg-muted">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}

        <Pagination count={filteredSubscriptions.length} />
      </section>
    </div>
  );
}

function MetricCard({
  label,
  value,
  change,
  positive,
  icon,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
          {icon}
        </div>

        <span
          className={`inline-flex items-center gap-1 text-xs font-medium ${
            positive ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {change}
        </span>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
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
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

function Pagination({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-between border-t border-border px-5 py-4">
      <p className="text-xs text-muted-foreground">
        Showing {count} subscription{count === 1 ? "" : "s"}
      </p>

      <div className="flex items-center gap-1">
        <button className="rounded-lg border border-border p-2 hover:bg-muted">
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-foreground px-2 text-xs text-background">
          1
        </span>

        <button className="rounded-lg border border-border p-2 hover:bg-muted">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
