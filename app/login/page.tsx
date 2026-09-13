"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";

import {
  getBusinessAccounts,
} from "@/lib/api/onboarding";

import {
  loginUser,
  loginWithGoogle,
} from "@/lib/api/auth";

import {
  clearAuth,
  saveAuthToken,
  saveTenantContext,
} from "@/lib/auth";

import {
  GoogleSignInButton,
} from "@/components/auth/google-sign-in-button";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] =
    useState(false);

  const finishAuthentication = useCallback(
    async (
      accessToken: string,
      tokenType: string,
    ) => {
      saveAuthToken(
        accessToken,
        tokenType,
      );

      const businessAccounts =
        await getBusinessAccounts();

      if (businessAccounts.length === 0) {
        router.replace("/onboarding");
        return;
      }

      const businessAccount =
        businessAccounts[0];

      saveTenantContext(
        businessAccount.tenant_id,
        businessAccount.id,
      );

      router.replace("/dashboard");
    },
    [router],
  );

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      clearAuth();

      const response = await loginUser({
        email: email.trim(),
        password,
      });

      await finishAuthentication(
        response.access_token,
        response.token_type,
      );
    } catch (err) {
      clearAuth();

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to sign in.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleCredential(
    credential: string,
  ) {
    setError("");

    try {
      setGoogleLoading(true);

      clearAuth();

      const response =
        await loginWithGoogle({
          credential,
        });

      await finishAuthentication(
        response.access_token,
        response.token_type,
      );
    } catch (err) {
      clearAuth();

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to sign in with Google.",
        );
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  const authenticationLoading =
    loading || googleLoading;

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side */}
        <div className="relative hidden overflow-hidden bg-zinc-950 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.35),transparent_35%)]" />

          <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative p-10">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <Sparkles className="h-4 w-4" />
              </div>

              Marketing System
            </Link>
          </div>

          <div className="relative max-w-xl p-10 pb-16">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300">
              Autonomous marketing
            </p>

            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white">
              Your marketing system is ready when you are.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-400">
              Create campaigns, publish content, connect
              your platforms, and learn from your
              marketing performance from one workspace.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>

                Marketing System
              </Link>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm sm:p-9">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  Sign in to continue to your marketing
                  workspace.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              <form
                className="mt-8 space-y-5"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-zinc-800"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    disabled={authenticationLoading}
                    className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-50"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-zinc-800"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      disabled
                      className="text-xs font-medium text-zinc-400"
                    >
                    <Link
                      href="/forgot-password"
                      className="text-sm text-zinc-400 transition hover:text-zinc-950 hover:underline"
                    >
                      Forgot password?
                    </Link>
                    </button>
                  </div>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    disabled={authenticationLoading}
                    className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authenticationLoading}
                  className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-zinc-950 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>

              <div className="relative my-7">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-200" />
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs text-zinc-400">
                    OR
                  </span>
                </div>
              </div>

              <GoogleSignInButton
                onCredential={
                  handleGoogleCredential
                }
                disabled={
                  authenticationLoading
                }
              />

              {googleLoading && (
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-500">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Signing in with Google...
                </div>
              )}

              <p className="mt-7 text-center text-sm text-zinc-500">
                Do not have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-zinc-950 hover:underline"
                >
                  Create one
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs text-zinc-400">
              By continuing, you agree to our Terms and
              Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}