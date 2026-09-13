"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  Instagram,
  Linkedin,
  Menu,
  MoreHorizontal,
  Plus,
  Sparkles,
} from "lucide-react";

import { DashboardSidebar } from "@/components/navigation/dashboard-sidebar";

const posts = [
  {
    day: "09",
    date: "Tue",
    posts: [
      {
        time: "6:30 PM",
        title: "5 ways to improve your social media presence",
        platform: "Instagram",
        status: "Scheduled",
      },
    ],
  },
  {
    day: "10",
    date: "Wed",
    posts: [
      {
        time: "10:00 AM",
        title: "What businesses should know about AI marketing",
        platform: "LinkedIn",
        status: "Scheduled",
      },
      {
        time: "6:00 PM",
        title: "Behind the scenes: our latest campaign",
        platform: "Instagram",
        status: "Draft",
      },
    ],
  },
  {
    day: "11",
    date: "Thu",
    posts: [
      {
        time: "9:30 AM",
        title: "How autonomous marketing saves your team time",
        platform: "LinkedIn",
        status: "Scheduled",
      },
    ],
  },
  {
    day: "12",
    date: "Fri",
    posts: [
      {
        time: "5:30 PM",
        title: "3 marketing lessons we learned this month",
        platform: "Instagram",
        status: "Scheduled",
      },
    ],
  },
  {
    day: "13",
    date: "Sat",
    posts: [],
  },
  {
    day: "14",
    date: "Sun",
    posts: [
      {
        time: "11:00 AM",
        title: "Weekly business growth checklist",
        platform: "LinkedIn",
        status: "Scheduled",
      },
    ],
  },
  {
    day: "15",
    date: "Mon",
    posts: [
      {
        time: "6:30 PM",
        title: "Why consistency matters in social media",
        platform: "Instagram",
        status: "Scheduled",
      },
    ],
  },
];

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              aria-label="Open menu"
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

        {/* Desktop Header */}
        <div className="hidden h-16 items-center justify-between border-b border-neutral-200 px-7 md:flex">
          <div>
            <p className="text-xs text-neutral-500">Workspace</p>
            <p className="text-sm font-medium">Your business workspace</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
            <CalendarDays size={15} />
            <span>September 2026 Schedule</span>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto w-full max-w-[1450px] px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <section className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-1 text-sm text-neutral-500">Manage</p>

              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Content Calendar
              </h1>

              <p className="mt-1 text-sm text-neutral-500 sm:text-base">
                Review and manage everything your marketing system has planned.
              </p>
            </div>

            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800">
              <Plus className="h-4 w-4" />
              Create post
            </button>
          </section>

          {/* Toolbar */}
          <section className="mb-5 flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <button
                aria-label="Previous week"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 transition hover:bg-neutral-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="min-w-0 text-center">
                <p className="text-sm font-medium text-neutral-900">
                  September 9 – September 15, 2026
                </p>

                <p className="text-xs text-neutral-500">This week</p>
              </div>

              <button
                aria-label="Next week"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 transition hover:bg-neutral-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                <Filter className="h-4 w-4" />
                Filter
              </button>

              <button className="inline-flex h-10 items-center justify-center rounded-xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                Week
                <ChevronRight className="ml-2 h-4 w-4 rotate-90" />
              </button>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Scheduled" value="25" />
            <StatCard label="Drafts" value="4" />
            <StatCard label="Published" value="42" />
            <StatCard label="Platforms" value="3" />
          </section>

          {/* Calendar Grid */}
          <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            {/* Desktop week header */}
            <div className="hidden grid-cols-7 border-b border-neutral-200 lg:grid">
              {posts.map((day) => (
                <div
                  key={day.day}
                  className={`min-h-[72px] border-r border-neutral-200 p-3 last:border-r-0 ${
                    day.day === "09" ? "bg-neutral-50" : ""
                  }`}
                >
                  <p className="text-xs text-neutral-500">{day.date}</p>

                  <p
                    className={`mt-1 text-lg font-semibold ${
                      day.day === "09" ? "underline underline-offset-4 text-neutral-950" : "text-neutral-900"
                    }`}
                  >
                    {day.day}
                  </p>
                </div>
              ))}
            </div>

            {/* Desktop calendar cells */}
            <div className="hidden min-h-[560px] grid-cols-7 lg:grid">
              {posts.map((day) => (
                <div
                  key={day.day}
                  className={`border-r border-neutral-200 p-2 last:border-r-0 ${
                    day.day === "09" ? "bg-neutral-50/50" : ""
                  }`}
                >
                  <div className="space-y-2">
                    {day.posts.map((post) => (
                      <CalendarPost
                        key={`${day.day}-${post.title}`}
                        post={post}
                      />
                    ))}
                  </div>

                  {day.posts.length === 0 && (
                    <button className="mt-1 flex h-8 w-full items-center justify-center rounded-lg border border-dashed border-neutral-200 text-neutral-400 opacity-0 transition hover:opacity-100 hover:text-neutral-700">
                      <Plus className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile / tablet list */}
            <div className="divide-y divide-neutral-200 lg:hidden">
              {posts.map((day) => (
                <div key={day.day} className="p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-col items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
                      <span className="text-[10px] text-neutral-500">{day.date}</span>
                      <span className="text-sm font-semibold">{day.day}</span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        September {Number(day.day)}, 2026
                      </p>
                      <p className="text-xs text-neutral-500">
                        {day.posts.length} {day.posts.length === 1 ? "post" : "posts"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {day.posts.length > 0 ? (
                      day.posts.map((post) => (
                        <CalendarPost
                          key={`${day.day}-${post.title}`}
                          post={post}
                          mobile
                        />
                      ))
                    ) : (
                      <button className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-200 text-sm text-neutral-500">
                        <Plus className="h-4 w-4" />
                        Add post
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI planning */}
          <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold text-neutral-950">
                    Your marketing system is planning ahead
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-neutral-500">
                    AI can continuously generate and schedule content based on
                    your active campaigns, audience, objectives, and connected
                    platforms.
                  </p>
                </div>
              </div>

              <button className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                View AI activity
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 shadow-sm">
      <p className="text-xs text-neutral-500 sm:text-sm">{label}</p>
      <p className="mt-1 text-xl font-semibold sm:text-2xl text-neutral-950">{value}</p>
    </div>
  );
}

function CalendarPost({
  post,
  mobile = false,
}: {
  post: {
    time: string;
    title: string;
    platform: string;
    status: string;
  };
  mobile?: boolean;
}) {
  const PlatformIcon = post.platform === "Instagram" ? Instagram : Linkedin;

  return (
    <article
      className={`group rounded-xl border border-neutral-200 bg-white p-3 transition hover:shadow-sm ${
        mobile ? "w-full" : ""
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <Clock3 className="h-3.5 w-3.5" />
          {post.time}
        </div>

        <button
          aria-label="Post options"
          className="opacity-60 transition hover:opacity-100"
        >
          <MoreHorizontal className="h-4 w-4 text-neutral-500" />
        </button>
      </div>

      <h3 className="text-xs font-medium leading-5 sm:text-sm text-neutral-900">
        {post.title}
      </h3>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500">
          <PlatformIcon className="h-3.5 w-3.5" />
          {post.platform}
        </span>

        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
            post.status === "Draft"
              ? "border border-neutral-200 text-neutral-500"
              : "bg-neutral-100 text-neutral-900"
          }`}
        >
          {post.status}
        </span>
      </div>
    </article>
  );
}
