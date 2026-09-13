"use client";

import React, { useState } from "react";
import Link from "next/link";

export function PricingSection() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const pricing = {
    INR: {
      trial: "₹0",
      starter: "₹999",
      pro: "₹1,999",
      periodTrial: "/ 2 Days",
      periodMonth: "/ Month",
    },
    USD: {
      trial: "$0",
      starter: "$12",
      pro: "$25",
      periodTrial: "/ 2 Days",
      periodMonth: "/ Month",
    },
  };

  const current = pricing[currency];

  return (
    <section id="pricing" className="bg-[#FAF9FF] py-24 text-slate-900 font-sans border-t border-purple-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow Badge */}
        <div className="flex justify-center">
          <span className="text-xs font-semibold text-purple-600 bg-purple-50 border border-purple-100 px-4 py-1.5 rounded-full shadow-sm">
            • Pricing
          </span>
        </div>

        {/* Section Title */}
        <div className="text-center mt-4 mb-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Choose The Plan That <br /> Fits Your Finances
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            Simple, autonomous social media & local SEO marketing for growing businesses.
          </p>
        </div>

        {/* Currency Switcher Pill */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-200/70 p-1 rounded-full flex items-center">
            <button
              type="button"
              onClick={() => setCurrency("INR")}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                currency === "INR"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              INR (₹)
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                currency === "USD"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* 1. Free Trial Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 text-lg font-bold">
                👍
              </div>
              <h3 className="text-xl font-bold mt-5 text-slate-900">Free Trial</h3>
              <p className="text-xs text-slate-500 mt-1">For testing autonomous marketing</p>

              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                  {current.trial}
                </span>
                <span className="text-xs font-medium text-slate-400 ml-1.5">
                  {current.periodTrial}
                </span>
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Features</p>
                <ul className="mt-4 space-y-3.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">✓</span>
                    4 Total AI Generated Posts
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">✓</span>
                    Google Business Profile & Instagram
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">✓</span>
                    Auto Local Hashtags & Captions
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">✓</span>
                    Dynamic Branded Templates
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">✓</span>
                    No Credit Card Required
                  </li>
                </ul>
              </div>
            </div>

            <Link
              href="/signup"
              className="mt-8 block text-center w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition shadow-sm"
            >
              Try For Free
            </Link>
          </div>

          {/* 2. Pro Autopilot Card (Hero / Solid Purple Middle Card) */}
          <div className="bg-[#5B3DF5] rounded-3xl p-8 shadow-xl text-white flex flex-col justify-between transform lg:-translate-y-2">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white text-lg font-bold backdrop-blur-sm">
                🚀
              </div>
              <h3 className="text-xl font-bold mt-5 text-white">Pro Autopilot</h3>
              <p className="text-xs text-purple-200 mt-1">SMEs, Clinics, Growth Brands</p>

              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight text-white">
                  {current.pro}
                </span>
                <span className="text-xs font-medium text-purple-200 ml-1.5">
                  {current.periodMonth}
                </span>
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Features</p>
                <ul className="mt-4 space-y-3.5 text-xs text-purple-100">
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-[10px]">✓</span>
                    <strong>2 Posts / Day</strong> (60 Posts / Month)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-[10px]">✓</span>
                    GMB + Instagram + Facebook + LinkedIn
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-[10px]">✓</span>
                    Google 3-Pack SEO Keyword Optimization
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-[10px]">✓</span>
                    Full GMB Call & Reach Analytics
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-[10px]">✓</span>
                    Priority WhatsApp & Chat Support
                  </li>
                </ul>
              </div>
            </div>

            <Link
              href="/signup"
              className="mt-8 block text-center w-full py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#5B3DF5] font-bold text-xs transition shadow-md"
            >
              ✨ Upgrade to Pro
            </Link>
          </div>

          {/* 3. Starter Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 text-lg font-bold">
                ⚙️
              </div>
              <h3 className="text-xl font-bold mt-5 text-slate-900">Starter Plan</h3>
              <p className="text-xs text-slate-500 mt-1">Single stores & local retail shops</p>

              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                  {current.starter}
                </span>
                <span className="text-xs font-medium text-slate-400 ml-1.5">
                  {current.periodMonth}
                </span>
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Features</p>
                <ul className="mt-4 space-y-3.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">✓</span>
                    <strong>1 Post / Day</strong> (30 Posts / Month)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">✓</span>
                    GMB, Instagram & Facebook
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">✓</span>
                    AI Captions with Business Phone & Logo
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">✓</span>
                    Monthly Performance Summary
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">✓</span>
                    Standard Email Support
                  </li>
                </ul>
              </div>
            </div>

            <Link
              href="/signup"
              className="mt-8 block text-center w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition shadow-sm"
            >
              Start Starter Plan
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
