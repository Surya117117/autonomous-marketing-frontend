"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@marketingsystem.com");
  const [password, setPassword] = useState("••••••••••••");
  const [securityPin, setSecurityPin] = useState("984102");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-600/30">
            <ShieldCheck size={28} />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Admin System Portal
          </h1>
          <p className="mt-2 text-xs text-neutral-400">
            Authorized administrative & system control login boundary.
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/90 p-8 shadow-2xl backdrop-blur">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/admin/dashboard";
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-xs font-medium text-neutral-300">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 text-sm text-white focus:border-purple-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 text-sm text-white focus:border-purple-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300">Admin Security PIN / 2FA</label>
              <input
                type="text"
                value={securityPin}
                onChange={(e) => setSecurityPin(e.target.value)}
                placeholder="6-digit security code"
                className="mt-1.5 h-11 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 text-sm font-mono text-white focus:border-purple-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-purple-600 font-semibold text-sm text-white shadow-lg shadow-purple-600/30 transition hover:bg-purple-500"
            >
              Access Admin Console
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 border-t border-neutral-800 pt-4 text-center">
            <Link href="/dashboard" className="text-xs text-neutral-500 hover:text-neutral-300">
              ← Return to User Workspace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
