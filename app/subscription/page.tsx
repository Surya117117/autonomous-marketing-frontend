"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  CreditCard,
  Download,
  HelpCircle,
  Menu,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { DashboardSidebar } from "@/components/navigation/dashboard-sidebar";

const plans = [
  {
    name: "Free",
    description: "For individuals testing autonomous AI marketing.",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    features: [
      "1 Active campaign",
      "2 Social accounts",
      "25 AI content generations / mo",
      "Basic analytics",
      "Community support",
    ],
    cta: "Current Plan",
    current: false,
    popular: false,
  },
  {
    name: "Starter",
    description: "For small businesses & solo entrepreneurs growing reach.",
    monthlyPrice: "$39",
    yearlyPrice: "$29",
    features: [
      "5 Active campaigns",
      "4 Social accounts",
      "150 AI content generations / mo",
      "Standard analytics dashboard",
      "Automated content scheduling",
      "Email support",
    ],
    cta: "Upgrade to Starter",
    current: false,
    popular: false,
  },
  {
    name: "Growth",
    description: "For growing brands scaling multi-platform automation.",
    monthlyPrice: "$99",
    yearlyPrice: "$79",
    features: [
      "15 Active campaigns",
      "10 Social accounts",
      "500 AI content generations / mo",
      "Advanced analytics & insights",
      "Autonomous multi-platform publishing",
      "Custom AI brand voice tuning",
      "Priority support",
    ],
    cta: "Current Plan",
    current: true,
    popular: true,
  },
  {
    name: "Scale",
    description: "For agencies & enterprise teams managing multiple brands.",
    monthlyPrice: "$249",
    yearlyPrice: "$199",
    features: [
      "Unlimited active campaigns",
      "25 Social accounts",
      "2,000 AI content generations / mo",
      "Real-time analytics & ROI tracking",
      "Dedicated account manager",
      "Custom API & webhook integrations",
      "10 Team seats with roles",
    ],
    cta: "Upgrade to Scale",
    current: false,
    popular: false,
  },
];

const usageStats = [
  {
    name: "AI Content Generations",
    used: 342,
    total: 500,
    unit: "generations",
    color: "bg-neutral-950",
  },
  {
    name: "Active Campaigns",
    used: 3,
    total: 15,
    unit: "campaigns",
    color: "bg-blue-600",
  },
  {
    name: "Social Connections",
    used: 3,
    total: 10,
    unit: "connected",
    color: "bg-purple-600",
  },
  {
    name: "Monthly Published Posts",
    used: 42,
    total: 200,
    unit: "posts",
    color: "bg-emerald-600",
  },
];

const invoices = [
  {
    id: "INV-2026-009",
    date: "Sep 1, 2026",
    amount: "$79.00",
    status: "Paid",
    plan: "Growth Plan (Annual)",
  },
  {
    id: "INV-2026-008",
    date: "Aug 1, 2026",
    amount: "$79.00",
    status: "Paid",
    plan: "Growth Plan (Annual)",
  },
  {
    id: "INV-2026-007",
    date: "Jul 1, 2026",
    amount: "$79.00",
    status: "Paid",
    plan: "Growth Plan (Annual)",
  },
];

export default function SubscriptionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen md:pl-[230px]">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 md:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            >
              <Menu size={19} />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 text-white">
                <Sparkles size={14} />
              </div>
              <span className="text-sm font-semibold">Marketing System</span>
            </div>
          </div>
        </header>

        {/* Desktop Header Bar */}
        <div className="hidden h-16 items-center justify-between border-b border-neutral-200 px-7 md:flex">
          <div>
            <p className="text-xs text-neutral-500">Workspace</p>
            <p className="text-sm font-medium">Your business workspace</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Growth Plan Active
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-[1450px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Header Title */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-neutral-500">Billing & Account</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Subscription & Plans
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-neutral-500">
                Manage your subscription tier, usage quotas, payment methods, and invoice history.
              </p>
            </div>

            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800">
              <Zap size={16} />
              Manage Subscription
            </button>
          </div>

          {/* Current Plan Overview Card */}
          <section className="mt-7 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                  <Sparkles size={22} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-lg font-semibold text-neutral-950">
                      Growth Plan
                    </h2>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                      Active · Billed Yearly
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-500">
                    Your next renewal is on <span className="font-medium text-neutral-900">October 9, 2026</span> for <span className="font-medium text-neutral-900">$79/mo</span> ($948 billed annually).
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-neutral-100 pt-4 lg:border-t-0 lg:pt-0">
                <button className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 px-4 text-xs font-medium text-neutral-700 hover:bg-neutral-50">
                  Update Payment
                </button>
                <button className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-950 px-4 text-xs font-medium text-white hover:bg-neutral-800">
                  Change Plan
                </button>
              </div>
            </div>
          </section>

          {/* Usage Quotas */}
          <section className="mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-neutral-950">Usage & Limits</h2>
                <p className="text-xs text-neutral-500">Resource consumption for current billing cycle</p>
              </div>
              <span className="text-xs text-neutral-500">Resets in 21 days</span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {usageStats.map((stat) => {
                const percentage = Math.round((stat.used / stat.total) * 100);
                return (
                  <div
                    key={stat.name}
                    className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-xs font-medium text-neutral-500">{stat.name}</p>

                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="text-xl font-bold tracking-tight text-neutral-950">
                        {stat.used} <span className="text-xs font-normal text-neutral-500">/ {stat.total}</span>
                      </span>
                      <span className="text-xs font-semibold text-neutral-700">{percentage}%</span>
                    </div>

                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                      <div
                        className={`h-full ${stat.color} rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Pricing Plans */}
          <section className="mt-10">
            <div className="text-center">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Choose the right plan for your business
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Unlock autonomous campaign creation, advanced analytics, and multi-platform publishing.
              </p>

              {/* Monthly / Yearly Toggle */}
              <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-neutral-50 p-1">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                    !isYearly ? "bg-white text-neutral-950 shadow-sm" : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  Monthly billing
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition ${
                    isYearly ? "bg-neutral-950 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  Yearly billing
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>

            {/* Plan Cards Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {plans.map((plan) => {
                const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
                return (
                  <div
                    key={plan.name}
                    className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all ${
                      plan.popular
                        ? "border-neutral-950 bg-white shadow-md ring-1 ring-neutral-950"
                        : "border-neutral-200 bg-white hover:border-neutral-400"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neutral-950 px-3 py-1 text-[11px] font-semibold text-white">
                        Most Popular
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-neutral-950">{plan.name}</h3>
                        {plan.current && (
                          <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-800">
                            Current
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-xs leading-5 text-neutral-500 min-h-[40px]">
                        {plan.description}
                      </p>

                      <div className="mt-4 flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold tracking-tight text-neutral-950">
                          {price}
                        </span>
                        <span className="text-xs text-neutral-500">/ month</span>
                      </div>

                      <hr className="my-5 border-neutral-100" />

                      <ul className="space-y-3 text-xs text-neutral-700">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <Check size={15} className="shrink-0 text-emerald-600 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      className={`mt-8 h-10 w-full rounded-xl text-xs font-semibold transition ${
                        plan.current
                          ? "border border-neutral-200 bg-neutral-50 text-neutral-400 cursor-default"
                          : plan.popular
                          ? "bg-neutral-950 text-white hover:bg-neutral-800"
                          : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Payment Method & Invoices Grid */}
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Payment Method */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-neutral-950">Payment Method</h2>
              <p className="text-xs text-neutral-500">Card used for subscription payments</p>

              <div className="mt-5 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-12 items-center justify-center rounded-md bg-neutral-950 text-white text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">•••• •••• •••• 4242</p>
                    <p className="text-xs text-neutral-500">Expires 12/2028</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button className="h-9 w-full rounded-lg border border-neutral-200 bg-white text-xs font-medium text-neutral-700 hover:bg-neutral-50">
                  Update Card
                </button>
              </div>
            </section>

            {/* Billing History */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-neutral-950">Billing History</h2>
                  <p className="text-xs text-neutral-500">Past invoice downloads & receipts</p>
                </div>

                <button className="text-xs font-medium text-neutral-950 hover:underline">
                  Download All
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex flex-col gap-2 rounded-xl border border-neutral-100 bg-neutral-50/50 p-3.5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-neutral-950">{inv.id}</span>
                        <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                          {inv.status}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500">{inv.plan} · {inv.date}</p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <span className="text-sm font-bold text-neutral-950">{inv.amount}</span>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100">
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
