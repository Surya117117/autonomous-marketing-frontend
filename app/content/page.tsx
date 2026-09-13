"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Copy,
  Edit3,
  Eye,
  Facebook,
  FileCheck,
  Filter,
  Instagram,
  Linkedin,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Store,
  ThumbsDown,
  ThumbsUp,
  X,
  Zap,
} from "lucide-react";

import { DashboardSidebar } from "@/components/navigation/dashboard-sidebar";

type ReviewPost = {
  id: string;
  title: string;
  platform: "Instagram" | "LinkedIn" | "Facebook" | "Google Business (GMB)";
  campaign: string;
  scheduledTime: string;
  status: "Pending Review" | "Approved" | "Rejected" | "Scheduled";
  copy: string;
  hashtags: string[];
  objective: string;
  pillar: string;
  aiReasoning: string;
  suggestedSlot: string;
};

const initialPosts: ReviewPost[] = [
  {
    id: "post-101",
    title: "5 AI Strategies Every Marketer Needs in 2026",
    platform: "LinkedIn",
    campaign: "September Growth Campaign",
    scheduledTime: "Tomorrow · 10:00 AM",
    status: "Pending Review",
    copy: "Autonomous AI is revolutionizing how modern marketing teams scale campaign output. Here are 5 battle-tested strategies to boost your audience reach by 3x without increasing headcount.\n\nKey takeaways:\n1. Prompt-to-campaign generation\n2. Real-time engagement optimization\n3. Cross-platform auto-scheduling",
    hashtags: ["#AIInMarketing", "#SaaSGrowth", "#B2BStrategy", "#MarketingAutomation"],
    objective: "Thought Leadership & Lead Gen",
    pillar: "Educational & Strategy",
    aiReasoning: "Tuned for B2B decision makers on LinkedIn. High engagement probability between 9 AM - 11 AM.",
    suggestedSlot: "Thursday 10:00 AM EST",
  },
  {
    id: "post-102",
    title: "How autonomous marketing scaled our demo requests by 3x",
    platform: "Instagram",
    campaign: "September Growth Campaign",
    scheduledTime: "Tomorrow · 6:30 PM",
    status: "Pending Review",
    copy: "Struggling with post consistency? 🚀\n\nSetting up autonomous campaign workflows allowed our team to publish 4x faster with zero burnout. Swipe through to see our weekly growth analytics breakdown!",
    hashtags: ["#StartupGrowth", "#ContentMarketing", "#ProductivityHack"],
    objective: "Brand Awareness",
    pillar: "Product Demo & Results",
    aiReasoning: "Visual carousel layout designed for high swipe-through rate on Instagram reels/posts.",
    suggestedSlot: "Thursday 6:30 PM EST",
  },
  {
    id: "post-103",
    title: "Prompt to Multi-Platform Campaign Workflow Demo",
    platform: "Facebook",
    campaign: "Product Awareness",
    scheduledTime: "Friday · 2:00 PM",
    status: "Pending Review",
    copy: "Watch how simple inputs turn into a multi-platform content strategy in under 60 seconds with our autonomous marketing engine. Try it free today!",
    hashtags: ["#MarketingTools", "#SmallBusiness"],
    objective: "Direct Conversions & Trial Signups",
    pillar: "Product Feature Highlight",
    aiReasoning: "Direct CTA phrasing targeted at Facebook SMB business owners.",
    suggestedSlot: "Friday 2:00 PM EST",
  },
  {
    id: "post-104",
    title: "Stop scheduling posts manually in 2026",
    platform: "Google Business (GMB)",
    campaign: "Founder Brand Campaign",
    scheduledTime: "Saturday · 11:00 AM",
    status: "Approved",
    copy: "If your local business is still manually updating Google Search listings & posts every week, you are losing local walk-in customers. Let AI handle the update pipeline.",
    hashtags: ["#LocalBusiness", "#GoogleMyBusiness"],
    objective: "Local Search Visibility",
    pillar: "Local Updates",
    aiReasoning: "Short-form offer update designed for Google Maps & Search local visitors.",
    suggestedSlot: "Saturday 11:00 AM EST",
  },
];

export default function ContentReviewPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState<ReviewPost[]>(initialPosts);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const toggleSelectAll = () => {
    if (selectedIds.length === posts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map((p) => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleUpdateStatus = (id: string, newStatus: ReviewPost["status"]) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, status: newStatus } : post))
    );
  };

  const handleBulkStatus = (newStatus: ReviewPost["status"]) => {
    setPosts((prev) =>
      prev.map((post) =>
        selectedIds.includes(post.id) ? { ...post, status: newStatus } : post
      )
    );
    setSelectedIds([]);
  };

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "Pending") return post.status === "Pending Review";
    if (activeFilter === "Approved") return post.status === "Approved";
    if (activeFilter === "Scheduled") return post.status === "Scheduled";
    return true;
  });

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
            <p className="text-sm font-medium">Content Review Queue</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-800">
              {posts.filter((p) => p.status === "Pending Review").length} Pending Approvals
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="mx-auto max-w-[1450px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Header Title */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-neutral-500">AI Post Approvals</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Content & Post Review
              </h1>
              <p className="mt-1 text-sm text-neutral-500">
                Review, edit, approve, or regenerate AI-created posts before they go live on social platforms.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800">
                <Sparkles size={16} />
                Generate New Posts
              </button>
            </div>
          </div>

          {/* Filter & Bulk Action Controls Bar */}
          <section className="mt-7 flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 overflow-x-auto">
              <label className="flex items-center gap-2 text-xs font-medium text-neutral-700 cursor-pointer pr-3 border-r border-neutral-200">
                <input
                  type="checkbox"
                  checked={selectedIds.length === posts.length && posts.length > 0}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded border-neutral-300 accent-neutral-950"
                />
                Select All
              </label>

              <div className="flex gap-1">
                {["All", "Pending", "Approved", "Scheduled"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      activeFilter === f
                        ? "bg-neutral-950 text-white"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2 animate-in fade-in">
                <span className="text-xs font-medium text-neutral-500">
                  {selectedIds.length} selected
                </span>
                <button
                  onClick={() => handleBulkStatus("Approved")}
                  className="h-8 rounded-lg bg-emerald-600 px-3 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  Approve Selected
                </button>
                <button
                  onClick={() => handleBulkStatus("Rejected")}
                  className="h-8 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-semibold text-red-700 hover:bg-red-100"
                >
                  Reject Selected
                </button>
              </div>
            )}
          </section>

          {/* Review Queue Feed */}
          <div className="mt-6 space-y-6">
            {filteredPosts.map((post) => {
              const PlatformIcon = getPlatformIcon(post.platform);
              const isSelected = selectedIds.includes(post.id);

              return (
                <div
                  key={post.id}
                  className={`rounded-2xl border transition-all bg-white shadow-sm ${
                    isSelected ? "border-neutral-950 ring-1 ring-neutral-950" : "border-neutral-200"
                  }`}
                >
                  <div className="p-5 sm:p-6">
                    {/* Header line */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(post.id)}
                          className="h-4 w-4 rounded border-neutral-300 accent-neutral-950"
                        />
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
                          <PlatformIcon size={20} />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-base font-semibold text-neutral-950">{post.title}</h2>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                post.status === "Pending Review"
                                  ? "bg-amber-100 text-amber-800"
                                  : post.status === "Approved"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : post.status === "Scheduled"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {post.status}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-neutral-500">
                            {post.campaign} · <span className="font-medium text-neutral-700">{post.scheduledTime}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateStatus(post.id, "Approved")}
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 text-xs font-semibold text-white hover:bg-emerald-700"
                        >
                          <Check size={14} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(post.id, "Rejected")}
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                        >
                          <X size={14} />
                          Reject
                        </button>
                      </div>
                    </div>

                    {/* Post Content Body */}
                    <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-3">
                      {/* Left: Copy & Preview */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                          <p className="whitespace-pre-line text-sm text-neutral-900 leading-relaxed font-sans">
                            {post.copy}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {post.hashtags.map((tag) => (
                              <span key={tag} className="text-xs font-medium text-blue-600 hover:underline">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Graphic Asset Mock Preview */}
                        <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-900 p-4 text-white">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 font-bold text-xs">
                            AI GRAPHIC
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-neutral-200">Generated Visual Asset</p>
                            <p className="text-[11px] text-neutral-400">1080 x 1080 Carousel Slide 1/3 (Optimized for {post.platform})</p>
                          </div>
                        </div>
                      </div>

                      {/* Right: AI Insights Panel */}
                      <div className="rounded-xl border border-neutral-200 bg-white p-4 space-y-3">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-950">
                          <Sparkles size={15} className="text-purple-600" />
                          <span>AI Campaign Context</span>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-neutral-500">Objective: </span>
                            <span className="font-semibold text-neutral-900">{post.objective}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500">Content Pillar: </span>
                            <span className="font-semibold text-neutral-900">{post.pillar}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500">Suggested Slot: </span>
                            <span className="font-semibold text-neutral-900">{post.suggestedSlot}</span>
                          </div>
                          <div className="mt-2 rounded-lg bg-purple-50 p-2.5 text-purple-950 border border-purple-100 text-[11px] leading-4">
                            <strong>AI Rationale:</strong> {post.aiReasoning}
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-neutral-100 text-xs">
                          <button className="flex items-center gap-1 text-neutral-600 hover:text-neutral-950">
                            <RefreshCw size={13} />
                            Regenerate Copy
                          </button>
                          <button className="flex items-center gap-1 text-neutral-600 hover:text-neutral-950 font-medium">
                            <Edit3 size={13} />
                            Edit Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

function getPlatformIcon(platform: string) {
  switch (platform) {
    case "Instagram":
      return Instagram;
    case "LinkedIn":
      return Linkedin;
    case "Facebook":
      return Facebook;
    case "Google Business (GMB)":
      return Store;
    default:
      return FileCheck;
  }
}
