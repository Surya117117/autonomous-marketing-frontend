"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  Eye,
  Heart,
  Instagram,
  Linkedin,
  Menu,
  MessageCircle,
  MousePointerClick,
  Play,
  Share2,
  Sparkles,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";

import { DashboardSidebar } from "@/components/navigation/dashboard-sidebar";

const kpis = [
  {
    title: "Total Reach",
    value: "128.4K",
    change: "+18.6%",
    positive: true,
    icon: Eye,
  },
  {
    title: "Engagement Rate",
    value: "8.42%",
    change: "+12.4%",
    positive: true,
    icon: Heart,
  },
  {
    title: "Followers",
    value: "24,892",
    change: "+7.8%",
    positive: true,
    icon: Users,
  },
  {
    title: "Conversions",
    value: "1,284",
    change: "+23.1%",
    positive: true,
    icon: MousePointerClick,
  },
];

const chartData = [
  { day: "Mon", reach: 42, engagement: 28 },
  { day: "Tue", reach: 55, engagement: 34 },
  { day: "Wed", reach: 48, engagement: 31 },
  { day: "Thu", reach: 72, engagement: 45 },
  { day: "Fri", reach: 89, engagement: 56 },
  { day: "Sat", reach: 64, engagement: 38 },
  { day: "Sun", reach: 78, engagement: 49 },
];

const topPosts = [
  {
    title: "5 AI Strategies Every Marketer Needs in 2026",
    platform: "LinkedIn",
    reach: "18.2K",
    likes: "1.4K",
    comments: "342",
    shares: "189",
    date: "Sep 7, 2026",
  },
  {
    title: "How autonomous marketing scaled our demo requests by 3x",
    platform: "Instagram",
    reach: "14.8K",
    likes: "2.1K",
    comments: "198",
    shares: "412",
    date: "Sep 5, 2026",
  },
  {
    title: "Behind the scenes: Prompt-to-campaign workflow demo",
    platform: "LinkedIn",
    reach: "11.6K",
    likes: "980",
    comments: "156",
    shares: "94",
    date: "Sep 3, 2026",
  },
];

const platformBreakdown = [
  { platform: "LinkedIn", percentage: 48, reach: "61.6K", color: "bg-blue-600" },
  { platform: "Instagram", percentage: 34, reach: "43.6K", color: "bg-pink-500" },
  { platform: "Facebook", percentage: 12, reach: "15.4K", color: "bg-blue-500" },
  { platform: "Google Business (GMB)", percentage: 6, reach: "7.8K", color: "bg-emerald-600" },
];

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen md:pl-[230px]">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#e4e4e7] bg-white px-4 md:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e4e4e7] text-neutral-700 hover:bg-[#fafafa]"
            >
              <Menu size={19} />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#09090b] text-white">
                <Sparkles size={14} />
              </div>
              <span className="text-sm font-semibold">Marketing System</span>
            </div>
          </div>
        </header>

        {/* Desktop Top Header Bar */}
        <div className="hidden h-16 items-center justify-between border-b border-[#e4e4e7] px-7 md:flex">
          <div>
            <p className="text-xs text-[#71717a]">Workspace</p>
            <p className="text-sm font-medium">Your business workspace</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-[#e4e4e7] px-3 py-1.5 text-sm font-medium text-[#09090b]">
              {timeRange}
              <ChevronDown size={15} />
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-[1450px] px-4 py-6 sm:px-6 lg:px-7 lg:py-8">
          {/* Header Title */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-[#71717a]">Performance & Insights</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Analytics Overview
              </h1>
              <p className="mt-1 text-sm text-[#71717a]">
                Track audience reach, engagement metrics, and top-performing content across platforms.
              </p>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.title} className="rounded-xl border border-[#e4e4e7] bg-white p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#71717a]">{kpi.title}</p>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f4f4f5] text-[#09090b]">
                      <Icon size={16} />
                    </div>
                  </div>
                  <p className="mt-3 text-2xl font-bold tracking-tight">{kpi.value}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                    <ArrowUpRight size={14} />
                    <span className="font-medium">{kpi.change}</span>
                    <span className="text-[#71717a]">vs last period</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Visual Section */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Performance Chart Simulation */}
            <div className="rounded-xl border border-[#e4e4e7] bg-white p-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Reach & Engagement Trends</h2>
                  <p className="text-xs text-[#71717a]">Weekly breakdown of content performance</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-[#09090b]" />
                    <span>Reach</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span>Engagement</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex h-56 items-end justify-between gap-3 border-b border-[#f4f4f5] pt-6">
                {chartData.map((d) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-full w-full items-end justify-center gap-1.5">
                      <div
                        className="w-4 rounded-t bg-[#09090b] transition-all"
                        style={{ height: `${d.reach}%` }}
                      />
                      <div
                        className="w-4 rounded-t bg-blue-500 transition-all"
                        style={{ height: `${d.engagement}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#71717a]">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Distribution */}
            <div className="rounded-xl border border-[#e4e4e7] bg-white p-6">
              <h2 className="text-lg font-semibold">Platform Reach</h2>
              <p className="text-xs text-[#71717a]">Audience distribution by platform</p>

              <div className="mt-6 space-y-4">
                {platformBreakdown.map((item) => (
                  <div key={item.platform}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-[#09090b]">{item.platform}</span>
                      <span className="text-xs text-[#71717a]">{item.reach} ({item.percentage}%)</span>
                    </div>
                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#f4f4f5]">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Performing Content */}
          <div className="mt-8 rounded-xl border border-[#e4e4e7] bg-white p-6">
            <h2 className="text-lg font-semibold">Top Performing Posts</h2>
            <p className="text-xs text-[#71717a]">Highest engaging content generated by AI</p>

            <div className="mt-5 space-y-4">
              {topPosts.map((post) => (
                <div
                  key={post.title}
                  className="flex flex-col justify-between gap-4 rounded-lg border border-[#f4f4f5] p-4 transition hover:bg-[#fafafa] sm:flex-row sm:items-center"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#f4f4f5] px-2 py-0.5 text-xs font-medium text-[#09090b]">
                        {post.platform}
                      </span>
                      <span className="text-xs text-[#71717a]">{post.date}</span>
                    </div>
                    <p className="text-sm font-medium text-[#09090b]">{post.title}</p>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-[#71717a]">
                    <div className="flex items-center gap-1.5">
                      <Eye size={14} />
                      <span className="font-medium text-[#09090b]">{post.reach}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Heart size={14} />
                      <span className="font-medium text-[#09090b]">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle size={14} />
                      <span className="font-medium text-[#09090b]">{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Share2 size={14} />
                      <span className="font-medium text-[#09090b]">{post.shares}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
