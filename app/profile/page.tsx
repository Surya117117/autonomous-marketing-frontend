"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  KeyRound,
  LogOut,
  Mail,
  Menu,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  User,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";

import { DashboardSidebar } from "@/components/navigation/dashboard-sidebar";

const teamMembers = [
  {
    name: "Alex Morgan",
    email: "alex.morgan@mybusiness.com",
    role: "Workspace Owner",
    status: "Active",
    initials: "AM",
  },
  {
    name: "Sarah Jenkins",
    email: "sarah.j@mybusiness.com",
    role: "Content Creator",
    status: "Active",
    initials: "SJ",
  },
  {
    name: "Marcus Vance",
    email: "marcus.v@mybusiness.com",
    role: "Analytics Manager",
    status: "Invited",
    initials: "MV",
  },
];

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Alex Morgan",
    email: "alex.morgan@mybusiness.com",
    phone: "+1 (555) 234-5678",
    role: "Owner / Marketing Lead",
    workspaceName: "My Business Workspace",
    workspaceId: "ws_live_984102947120",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    productUpdates: true,
    weeklyReport: true,
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
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
            <p className="text-xs text-neutral-500">Account</p>
            <p className="text-sm font-medium">User Profile & Team Workspace</p>
          </div>
          {savedMessage && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
              <Check size={14} />
              Profile updated successfully
            </span>
          )}
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-[1450px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Header Title */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-neutral-500">User Account</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Profile & Workspace
              </h1>
              <p className="mt-1 text-sm text-neutral-500">
                Manage your personal details, workspace membership, security credentials, and account settings.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left 2 Columns */}
            <div className="space-y-8 lg:col-span-2">
              {/* 1. Profile Information */}
              <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-neutral-950">Profile Information</h2>
                  <button
                    onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                    className="inline-flex h-9 items-center justify-center rounded-xl border border-neutral-200 bg-white px-3.5 text-xs font-semibold text-neutral-900 transition hover:bg-neutral-50"
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </button>
                </div>

                <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-xl font-bold text-white shadow-md">
                    AM
                    <button className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-neutral-800 text-white">
                      <User size={12} />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-neutral-950">{profile.fullName}</h3>
                    <p className="text-xs text-neutral-500">{profile.role}</p>
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <Mail size={13} />
                      <span>{profile.email}</span>
                    </div>
                  </div>
                </div>

                <hr className="my-6 border-neutral-100" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-neutral-500">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                        className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3 text-sm font-medium text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      />
                    ) : (
                      <p className="mt-1 text-sm font-semibold text-neutral-950">{profile.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-500">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3 text-sm font-medium text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      />
                    ) : (
                      <p className="mt-1 text-sm font-semibold text-neutral-950">{profile.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-500">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3 text-sm font-medium text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      />
                    ) : (
                      <p className="mt-1 text-sm font-semibold text-neutral-950">{profile.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-500">Role</label>
                    <p className="mt-1 text-sm font-semibold text-neutral-950">{profile.role}</p>
                  </div>
                </div>
              </section>

              {/* 2. Workspace & Team */}
              <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-neutral-950">Workspace Details</h2>
                    <p className="text-xs text-neutral-500">Workspace identifier and team members.</p>
                  </div>

                  <button className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-3.5 text-xs font-medium text-white hover:bg-neutral-800">
                    <UserPlus size={14} />
                    Invite Member
                  </button>
                </div>

                <div className="mt-6 rounded-xl bg-neutral-50 p-4">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs text-neutral-500">Workspace Name</p>
                      <p className="text-sm font-bold text-neutral-950">{profile.workspaceName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Workspace ID</p>
                      <p className="text-xs font-mono font-semibold text-neutral-700">{profile.workspaceId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Owner</p>
                      <p className="text-xs font-semibold text-neutral-900">Alex Morgan (You)</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-neutral-900">Team Members ({teamMembers.length})</h3>

                  <div className="mt-3 space-y-3">
                    {teamMembers.map((member) => (
                      <div
                        key={member.email}
                        className="flex items-center justify-between rounded-xl border border-neutral-100 p-3.5 transition hover:bg-neutral-50/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold text-neutral-800">
                            {member.initials}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-neutral-950">{member.name}</p>
                            <p className="text-xs text-neutral-500">{member.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-neutral-600">{member.role}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              member.status === "Active"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {member.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* 3. Account Security */}
              <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-neutral-950">Account Security</h2>
                <p className="text-xs text-neutral-500">Security status and activity</p>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between rounded-xl border border-neutral-100 p-3.5">
                    <div>
                      <p className="text-xs font-medium text-neutral-500">2FA Status</p>
                      <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                        <ShieldCheck size={14} />
                        Enabled (TOTP)
                      </p>
                    </div>
                    <button className="text-xs font-medium text-neutral-950 underline">
                      Manage
                    </button>
                  </div>

                  <div className="rounded-xl border border-neutral-100 p-3.5">
                    <p className="text-xs font-medium text-neutral-500">Last Login Activity</p>
                    <p className="mt-1 text-xs font-semibold text-neutral-900">Today at 4:15 PM</p>
                    <p className="text-[11px] text-neutral-500">New York, USA (Chrome / Windows)</p>
                  </div>

                  <button className="h-9 w-full rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 hover:bg-neutral-50">
                    Change Password
                  </button>
                </div>
              </section>

              {/* 4. Account Preferences */}
              <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-neutral-950">Account Preferences</h2>
                <p className="text-xs text-neutral-500">Email digest and notifications</p>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-neutral-900">Email Notifications</p>
                      <p className="text-[11px] text-neutral-500">Important system updates</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.emailNotifications}
                      onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                      className="h-4 w-4 rounded accent-neutral-950"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-neutral-900">Product Updates</p>
                      <p className="text-[11px] text-neutral-500">New feature releases</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.productUpdates}
                      onChange={(e) => setPreferences({ ...preferences, productUpdates: e.target.checked })}
                      className="h-4 w-4 rounded accent-neutral-950"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-neutral-900">Weekly Performance Report</p>
                      <p className="text-[11px] text-neutral-500">Automated performance summary</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.weeklyReport}
                      onChange={(e) => setPreferences({ ...preferences, weeklyReport: e.target.checked })}
                      className="h-4 w-4 rounded accent-neutral-950"
                    />
                  </div>
                </div>
              </section>

              {/* 5. Account Actions */}
              <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-neutral-950">Account Actions</h2>
                <div className="mt-4 space-y-3">
                  <button className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 hover:bg-neutral-50">
                    <LogOut size={15} />
                    Sign Out
                  </button>

                  <button className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700 hover:bg-red-100">
                    <Trash2 size={15} />
                    Delete Account
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
