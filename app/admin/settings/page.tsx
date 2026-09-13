"use client";

import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
        Admin System Settings
      </h1>
      <p className="text-sm text-neutral-500">
        Configure global platform parameters, API keys, and system flags.
      </p>

      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <Settings size={36} className="mx-auto text-neutral-400 mb-2" />
        <p className="text-sm font-semibold text-neutral-900">Admin Settings Module Placeholder</p>
        <p className="text-xs text-neutral-500 mt-1">Platform feature flags and system environment controls will be configured in Stage 10.</p>
      </div>
    </div>
  );
}
