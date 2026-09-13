"use client";

import { useState } from "react";
import {
  Bell,
  Building2,
  Check,
  ChevronRight,
  Globe,
  KeyRound,
  Lock,
  Menu,
  Palette,
  Palette as BrandIcon,
  Save,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Smartphone,
  Trash2,
  User,
  AlertTriangle,
} from "lucide-react";

import { DashboardSidebar } from "@/components/navigation/dashboard-sidebar";

const tabs = [
  { id: "general", label: "General", icon: Building2 },
  { id: "brand", label: "Brand Identity", icon: BrandIcon },
  { id: "preferences", label: "Marketing Preferences", icon: Sliders },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "danger", label: "Danger Zone", icon: ShieldAlert },
];

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [generalForm, setGeneralForm] = useState({
    workspaceName: "My Business Workspace",
    website: "https://mybusiness.com",
    industry: "SaaS & Technology",
    timezone: "America/New_York (UTC-05:00)",
  });

  const [brandForm, setBrandForm] = useState({
    brandVoice: "Professional, confident, and innovative",
    primaryColor: "#09090b",
    secondaryColor: "#3b82f6",
    description: "We help growing enterprises automate multi-channel marketing campaigns using autonomous AI.",
    targetAudience: "B2B SaaS Founders, Marketing Executives, and Growth Leaders.",
  });

  const [marketingForm, setMarketingForm] = useState({
    tone: "Informative & Authoritative",
    frequency: "Daily (7 posts / week)",
    autonomyLevel: "Semi-Autonomous (Requires approval before publishing)",
    objectives: ["Brand Awareness", "Lead Generation", "Product Demos"],
  });

  const [notificationsForm, setNotificationsForm] = useState({
    campaignAlerts: true,
    postPublishing: true,
    weeklyReport: true,
    aiSuggestions: true,
    emailDigest: false,
  });

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

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
            <p className="text-xs text-neutral-500">Settings</p>
            <p className="text-sm font-medium">Workspace & Account Preferences</p>
          </div>
          {savedSuccess && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
              <Check size={14} />
              Changes saved successfully
            </span>
          )}
        </div>

        {/* Content */}
        <div className="mx-auto max-w-[1450px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Header Title */}
          <div>
            <p className="text-sm text-neutral-500">Manage Workspace</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Settings & Preferences
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Configure business details, brand voice, AI behavior, and account security.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-7 flex flex-wrap border-b border-neutral-200 gap-1 sm:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-medium transition ${
                    active
                      ? "border-neutral-950 text-neutral-950 font-semibold"
                      : "border-transparent text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Settings Tab Panes */}
          <div className="mt-7 max-w-4xl">
            {/* 1. GENERAL SETTINGS */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-neutral-950">General Information</h2>
                  <p className="text-xs text-neutral-500">Workspace identity and localization settings.</p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700">Workspace Name</label>
                      <input
                        type="text"
                        value={generalForm.workspaceName}
                        onChange={(e) => setGeneralForm({ ...generalForm, workspaceName: e.target.value })}
                        className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm font-medium text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700">Company Website</label>
                      <input
                        type="url"
                        value={generalForm.website}
                        onChange={(e) => setGeneralForm({ ...generalForm, website: e.target.value })}
                        className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm font-medium text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-neutral-700">Industry</label>
                        <select
                          value={generalForm.industry}
                          onChange={(e) => setGeneralForm({ ...generalForm, industry: e.target.value })}
                          className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3 text-sm font-medium text-neutral-900 focus:border-neutral-950 focus:outline-none"
                        >
                          <option>SaaS & Technology</option>
                          <option>E-commerce & Retail</option>
                          <option>Digital Marketing Agency</option>
                          <option>Healthcare & Wellness</option>
                          <option>Financial Services</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700">Timezone</label>
                        <select
                          value={generalForm.timezone}
                          onChange={(e) => setGeneralForm({ ...generalForm, timezone: e.target.value })}
                          className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3 text-sm font-medium text-neutral-900 focus:border-neutral-950 focus:outline-none"
                        >
                          <option>America/New_York (UTC-05:00)</option>
                          <option>Europe/London (UTC+00:00)</option>
                          <option>Asia/Kolkata (UTC+05:30)</option>
                          <option>America/Los_Angeles (UTC-08:00)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* 2. BRAND IDENTITY */}
            {activeTab === "brand" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-neutral-950">Brand & Voice</h2>
                  <p className="text-xs text-neutral-500">Train the AI system to emulate your brand personality.</p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700">Brand Voice Guidelines</label>
                      <input
                        type="text"
                        value={brandForm.brandVoice}
                        onChange={(e) => setBrandForm({ ...brandForm, brandVoice: e.target.value })}
                        className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm font-medium text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700">Company Overview Description</label>
                      <textarea
                        rows={3}
                        value={brandForm.description}
                        onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })}
                        className="mt-1.5 w-full rounded-xl border border-neutral-200 p-3 text-sm font-medium text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700">Target Audience Profile</label>
                      <textarea
                        rows={2}
                        value={brandForm.targetAudience}
                        onChange={(e) => setBrandForm({ ...brandForm, targetAudience: e.target.value })}
                        className="mt-1.5 w-full rounded-xl border border-neutral-200 p-3 text-sm font-medium text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-neutral-700">Primary Brand Color</label>
                        <div className="mt-1.5 flex items-center gap-3">
                          <input
                            type="color"
                            value={brandForm.primaryColor}
                            onChange={(e) => setBrandForm({ ...brandForm, primaryColor: e.target.value })}
                            className="h-10 w-12 cursor-pointer rounded-lg border border-neutral-200 p-1"
                          />
                          <input
                            type="text"
                            value={brandForm.primaryColor}
                            onChange={(e) => setBrandForm({ ...brandForm, primaryColor: e.target.value })}
                            className="h-10 flex-1 rounded-xl border border-neutral-200 px-3 text-sm font-mono text-neutral-900 uppercase"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700">Secondary Accent Color</label>
                        <div className="mt-1.5 flex items-center gap-3">
                          <input
                            type="color"
                            value={brandForm.secondaryColor}
                            onChange={(e) => setBrandForm({ ...brandForm, secondaryColor: e.target.value })}
                            className="h-10 w-12 cursor-pointer rounded-lg border border-neutral-200 p-1"
                          />
                          <input
                            type="text"
                            value={brandForm.secondaryColor}
                            onChange={(e) => setBrandForm({ ...brandForm, secondaryColor: e.target.value })}
                            className="h-10 flex-1 rounded-xl border border-neutral-200 px-3 text-sm font-mono text-neutral-900 uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
                  >
                    <Save size={16} />
                    Save Brand Profile
                  </button>
                </div>
              </div>
            )}

            {/* 3. MARKETING PREFERENCES */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-neutral-950">AI & Campaign Rules</h2>
                  <p className="text-xs text-neutral-500">Define AI autonomy and publishing rules.</p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700">Content Tone</label>
                      <select
                        value={marketingForm.tone}
                        onChange={(e) => setMarketingForm({ ...marketingForm, tone: e.target.value })}
                        className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3 text-sm font-medium text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      >
                        <option>Informative & Authoritative</option>
                        <option>Conversational & Casual</option>
                        <option>Bold & Direct</option>
                        <option>Witty & Engaging</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700">Target Posting Frequency</label>
                      <select
                        value={marketingForm.frequency}
                        onChange={(e) => setMarketingForm({ ...marketingForm, frequency: e.target.value })}
                        className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3 text-sm font-medium text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      >
                        <option>Daily (7 posts / week)</option>
                        <option>3 Times / Week</option>
                        <option>2 Times / Week</option>
                        <option>Custom AI Optimized Schedule</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700">AI Autonomy Level</label>
                      <select
                        value={marketingForm.autonomyLevel}
                        onChange={(e) => setMarketingForm({ ...marketingForm, autonomyLevel: e.target.value })}
                        className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3 text-sm font-medium text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      >
                        <option>Semi-Autonomous (Requires approval before publishing)</option>
                        <option>Fully Autonomous (AI auto-publishes optimized posts)</option>
                        <option>Manual Review Only (Drafts generated for human review)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
                  >
                    <Save size={16} />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* 4. NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-neutral-950">Notification Controls</h2>
                  <p className="text-xs text-neutral-500">Choose when and how you receive workspace alerts.</p>

                  <div className="mt-6 space-y-4 divide-y divide-neutral-100">
                    <div className="flex items-center justify-between pt-3">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">Campaign Milestone Alerts</p>
                        <p className="text-xs text-neutral-500">Notify when campaign reaches 50% or 100% completion.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationsForm.campaignAlerts}
                        onChange={(e) => setNotificationsForm({ ...notificationsForm, campaignAlerts: e.target.checked })}
                        className="h-5 w-5 rounded border-neutral-300 accent-neutral-950"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">Post Publishing Confirmation</p>
                        <p className="text-xs text-neutral-500">Receive alerts whenever a post goes live automatically.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationsForm.postPublishing}
                        onChange={(e) => setNotificationsForm({ ...notificationsForm, postPublishing: e.target.checked })}
                        className="h-5 w-5 rounded border-neutral-300 accent-neutral-950"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">Weekly Performance Report</p>
                        <p className="text-xs text-neutral-500">Summary email of total reach and engagement gains.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationsForm.weeklyReport}
                        onChange={(e) => setNotificationsForm({ ...notificationsForm, weeklyReport: e.target.checked })}
                        className="h-5 w-5 rounded border-neutral-300 accent-neutral-950"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">AI Optimization Suggestions</p>
                        <p className="text-xs text-neutral-500">Get notified when AI recommends campaign adjustments.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationsForm.aiSuggestions}
                        onChange={(e) => setNotificationsForm({ ...notificationsForm, aiSuggestions: e.target.checked })}
                        className="h-5 w-5 rounded border-neutral-300 accent-neutral-950"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
                  >
                    <Save size={16} />
                    Save Notification Rules
                  </button>
                </div>
              </div>
            )}

            {/* 5. SECURITY */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-neutral-950">Password & Security</h2>
                  <p className="text-xs text-neutral-500">Manage account credentials and active login sessions.</p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700">Current Password</label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-neutral-700">New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••••••"
                          className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 focus:border-neutral-950 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-700">Confirm New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••••••"
                          className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 focus:border-neutral-950 focus:outline-none"
                        />
                      </div>
                    </div>

                    <hr className="my-4 border-neutral-100" />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">Two-Factor Authentication (2FA)</p>
                        <p className="text-xs text-neutral-500">Secure your account using TOTP authenticator app.</p>
                      </div>
                      <button className="h-9 rounded-lg border border-neutral-200 px-4 text-xs font-medium text-neutral-700 hover:bg-neutral-50">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-neutral-950">Active Sessions</h2>
                  <p className="text-xs text-neutral-500">Devices currently logged into your workspace.</p>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-neutral-50 p-3.5">
                      <div className="flex items-center gap-3">
                        <Smartphone size={20} className="text-neutral-700" />
                        <div>
                          <p className="text-sm font-semibold text-neutral-900">Chrome on Windows (Current)</p>
                          <p className="text-xs text-neutral-500">New York, USA · IP 192.168.1.45</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. DANGER ZONE */}
            {activeTab === "danger" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-red-200 bg-red-50/30 p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle size={20} />
                    <h2 className="text-base font-semibold">Danger Zone</h2>
                  </div>
                  <p className="mt-1 text-xs text-red-700">Irreversible and destructive workspace actions.</p>

                  <div className="mt-6 space-y-4 divide-y divide-red-100">
                    <div className="flex flex-col justify-between gap-3 pt-3 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">Pause Autonomous System</p>
                        <p className="text-xs text-neutral-500">Temporarily stop all scheduled post generations and publishing.</p>
                      </div>
                      <button className="h-9 rounded-xl border border-amber-300 bg-amber-50 px-4 text-xs font-semibold text-amber-800 hover:bg-amber-100">
                        Pause Workspace
                      </button>
                    </div>

                    <div className="flex flex-col justify-between gap-3 pt-4 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-sm font-semibold text-red-600">Delete Workspace Permanently</p>
                        <p className="text-xs text-neutral-500">Completely remove campaigns, connected platforms, and history.</p>
                      </div>
                      <button className="h-9 rounded-xl bg-red-600 px-4 text-xs font-semibold text-white hover:bg-red-700">
                        Delete Workspace
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
