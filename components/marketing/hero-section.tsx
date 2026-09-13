"use client";

import Link from "next/link";
import {
  ArrowRight,
  Play,
  Check,
  LayoutDashboard,
  Megaphone,
  FileText,
  Calendar,
  BarChart2,
  Share2,
  Bookmark,
  Settings,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0B0716] pb-24 pt-12 text-white lg:pb-32 lg:pt-16">
      {/* Radial Purple Glow Overlay */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-purple-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo-600/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Headline & Content */}
          <div className="lg:col-span-6">
            <div className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-purple-400">
              Your AI Marketing Team
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.15]">
              Plan, create, publish and grow —{" "}
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                automatically.
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-zinc-300">
              An autonomous AI marketing system that understands your business,
              creates on-brand content, publishes across social platforms, and
              learns what works.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-purple-600/30 transition-all hover:opacity-95 hover:shadow-purple-600/50"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#0B0716]">
                  <Play className="h-3 w-3 fill-current ml-0.5" />
                </div>
                See How It Works
              </a>
            </div>

            {/* Feature Checkmarks */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-purple-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-purple-400" />
                <span>Setup in minutes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-purple-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dashboard Mockup */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              
              {/* Outer Purple Glow Box */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-30 blur-2xl" />

              {/* Dashboard Container */}
              <div className="relative rounded-2xl border border-white/15 bg-[#120B24]/90 p-4 shadow-2xl backdrop-blur-2xl sm:p-6">
                
                {/* Header inside Dashboard */}
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo/app logo.png"
                      alt="Logo"
                      className="h-7 w-7 object-contain"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">Marketing System</div>
                      <div className="text-[11px] text-zinc-400">Good morning! Your AI marketing team is on track.</div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Running
                  </span>
                </div>

                {/* Dashboard Main Grid: Sidebar + Content */}
                <div className="grid grid-cols-12 gap-4">
                  
                  {/* Mini Sidebar */}
                  <div className="col-span-3 hidden flex-col gap-1.5 text-[11px] text-zinc-400 sm:flex">
                    <div className="flex items-center gap-2 rounded-lg bg-purple-600/20 px-2.5 py-2 text-purple-300 font-medium">
                      <LayoutDashboard className="h-3.5 w-3.5" />
                      <span>Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 hover:text-white">
                      <Megaphone className="h-3.5 w-3.5" />
                      <span>Campaigns</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 hover:text-white">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Content</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 hover:text-white">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Calendar</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 hover:text-white">
                      <BarChart2 className="h-3.5 w-3.5" />
                      <span>Analytics</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 hover:text-white">
                      <Share2 className="h-3.5 w-3.5" />
                      <span>Connections</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 hover:text-white">
                      <Bookmark className="h-3.5 w-3.5" />
                      <span>Brand</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 hover:text-white">
                      <Settings className="h-3.5 w-3.5" />
                      <span>Settings</span>
                    </div>
                  </div>

                  {/* Right Dashboard Body */}
                  <div className="col-span-12 sm:col-span-9">
                    
                    {/* 3 Metric Cards */}
                    <div className="grid grid-cols-3 gap-2.5">
                      
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-[10px] text-zinc-400">Total Posts</div>
                        <div className="mt-1 text-base font-bold text-white sm:text-lg">48</div>
                        <span className="text-[10px] text-emerald-400 font-medium">+23%</span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-[10px] text-zinc-400">Engagement</div>
                        <div className="mt-1 text-base font-bold text-white sm:text-lg">12.4K</div>
                        <span className="text-[10px] text-emerald-400 font-medium">+82%</span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-[10px] text-zinc-400">Reach</div>
                        <div className="mt-1 text-base font-bold text-white sm:text-lg">284K</div>
                        <span className="text-[10px] text-emerald-400 font-medium">+41%</span>
                      </div>
                    </div>

                    {/* Upcoming Posts List */}
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3.5">
                      <div className="text-xs font-semibold text-white mb-2.5">Upcoming Posts</div>
                      
                      <div className="space-y-2 text-[11px]">
                        
                        {/* Post Item 1 */}
                        <div className="flex items-center justify-between rounded-lg bg-black/30 p-2 border border-white/5">
                          <div className="flex items-center gap-2.5">
                            <div className="h-7 w-7 rounded bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-[10px]">
                              IG
                            </div>
                            <div>
                              <div className="font-medium text-white truncate max-w-[140px] sm:max-w-[180px]">How to choose the perfect...</div>
                              <div className="text-[9px] text-zinc-400">Instagram • Tomorrow 10:00 AM</div>
                            </div>
                          </div>
                          <span className="rounded bg-purple-500/20 px-2 py-0.5 text-[9px] text-purple-300 font-medium border border-purple-500/30">
                            Scheduled
                          </span>
                        </div>

                        {/* Post Item 2 */}
                        <div className="flex items-center justify-between rounded-lg bg-black/30 p-2 border border-white/5">
                          <div className="flex items-center gap-2.5">
                            <div className="h-7 w-7 rounded bg-blue-500/20 flex items-center justify-center text-blue-300 font-bold text-[10px]">
                              FB
                            </div>
                            <div>
                              <div className="font-medium text-white truncate max-w-[140px] sm:max-w-[180px]">5 tips for better home styling</div>
                              <div className="text-[9px] text-zinc-400">Facebook • Tomorrow 2:30 PM</div>
                            </div>
                          </div>
                          <span className="rounded bg-purple-500/20 px-2 py-0.5 text-[9px] text-purple-300 font-medium border border-purple-500/30">
                            Scheduled
                          </span>
                        </div>

                        {/* Post Item 3 */}
                        <div className="flex items-center justify-between rounded-lg bg-black/30 p-2 border border-white/5">
                          <div className="flex items-center gap-2.5">
                            <div className="h-7 w-7 rounded bg-pink-500/20 flex items-center justify-center text-pink-300 font-bold text-[10px]">
                              RL
                            </div>
                            <div>
                              <div className="font-medium text-white truncate max-w-[140px] sm:max-w-[180px]">Behind the scenes</div>
                              <div className="text-[9px] text-zinc-400">Reels • Oct 12, 11:00 AM</div>
                            </div>
                          </div>
                          <span className="rounded bg-purple-500/20 px-2 py-0.5 text-[9px] text-purple-300 font-medium border border-purple-500/30">
                            Scheduled
                          </span>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
