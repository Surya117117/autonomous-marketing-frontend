"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";

import {
  registerUser,
  loginWithGoogle,
  requestSignupVerification,
  verifySignupEmail,
} from "@/lib/api/auth";

import {
  saveAuthToken,
  clearAuth,
} from "@/lib/auth";

import {
  GoogleSignInButton,
} from "@/components/auth/google-sign-in-button";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [verificationCode, setVerificationCode] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);

  const [resendCooldown, setResendCooldown] = useState(0);

  const authenticationLoading =
    loading ||
    googleLoading ||
    verificationLoading;

  /*
   * Countdown for the backend's 60-second resend cooldown.
   */
  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setResendCooldown((current) =>
        current > 0 ? current - 1 : 0,
      );
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [resendCooldown]);

  /*
   * Google signup/login.
   *
   * This flow remains unchanged because Google already
   * verifies ownership of the Google account/email.
   */
  const handleGoogleCredential = useCallback(
    async (credential: string) => {
      setError("");

      try {
        setGoogleLoading(true);

        clearAuth();

        const response = await loginWithGoogle({
          credential,
        });

        saveAuthToken(
          response.access_token,
          response.token_type,
        );

        router.replace("/onboarding");
      } catch (err) {
        clearAuth();

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(
            "Unable to create your account with Google.",
          );
        }
      } finally {
        setGoogleLoading(false);
      }
    },
    [router],
  );

  /*
   * Start manual signup.
   *
   * IMPORTANT:
   * No JWT is created here.
   *
   * The backend sends an email verification code first.
   */
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!businessName.trim()) {
      setError("Please enter your business name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters.",
      );
      return;
    }

    try {
      setLoading(true);

      clearAuth();

      await registerUser({
        name: name.trim(),
        business_name: businessName.trim(),
        email: email.trim(),
        password,
      });

      setVerificationCode("");
      setVerificationStep(true);
      setResendCooldown(60);
    } catch (err) {
      clearAuth();

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to send the verification code.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  /*
   * Verify the six-digit email code.
   *
   * Successful verification creates the account and
   * returns the JWT.
   */
  async function handleVerifyEmail(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const code = verificationCode.replace(/\D/g, "");

    if (code.length !== 6) {
      setError(
        "Please enter the 6-digit verification code.",
      );
      return;
    }

    try {
      setVerificationLoading(true);

      clearAuth();

      const response = await verifySignupEmail({
        email: email.trim(),
        code,
      });

      saveAuthToken(
        response.access_token,
        response.token_type,
      );

      router.replace("/onboarding");
    } catch (err) {
      clearAuth();

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to verify your email address.",
        );
      }
    } finally {
      setVerificationLoading(false);
    }
  }

  /*
   * Resend the verification code.
   *
   * The backend enforces the 60-second cooldown.
   */
  async function handleResendCode() {
    if (resendCooldown > 0 || authenticationLoading) {
      return;
    }

    setError("");

    try {
      setVerificationLoading(true);

      await requestSignupVerification({
        name: name.trim(),
        business_name: businessName.trim(),
        email: email.trim(),
        password,
      });

      setVerificationCode("");
      setResendCooldown(60);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to resend the verification code.",
        );
      }
    } finally {
      setVerificationLoading(false);
    }
  }

  /*
   * Go back from OTP screen to signup form.
   */
  function handleBackToSignup() {
    setError("");
    setVerificationCode("");
    setVerificationStep(false);
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side */}
        <div className="relative hidden overflow-hidden bg-zinc-950 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(139,92,246,0.35),transparent_35%)]" />

          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

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
              Start growing
            </p>

            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white">
              Give your business an autonomous marketing team.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-400">
              Set up your business once. Your marketing
              workspace handles strategy, content,
              publishing, and performance insights.
            </p>

            <div className="mt-8 space-y-3 text-sm text-zinc-300">
              <div>✓ Build campaigns around your business goals</div>
              <div>✓ Generate on-brand marketing content</div>
              <div>✓ Connect and manage social platforms</div>
              <div>✓ Learn continuously from performance</div>
            </div>
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
              {!verificationStep ? (
                <>
                  {/* Signup form */}
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Create your account
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                      Start building your autonomous marketing
                      system.
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
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-zinc-800"
                      >
                        Full name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(event) =>
                          setName(event.target.value)
                        }
                        disabled={authenticationLoading}
                        required
                        className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="businessName"
                        className="mb-2 block text-sm font-medium text-zinc-800"
                      >
                        Business name
                      </label>

                      <input
                        id="businessName"
                        name="business_name"
                        type="text"
                        autoComplete="organization"
                        placeholder="Your business"
                        value={businessName}
                        onChange={(event) =>
                          setBusinessName(event.target.value)
                        }
                        disabled={authenticationLoading}
                        required
                        className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-50"
                      />
                    </div>

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
                        required
                        className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-zinc-800"
                      >
                        Password
                      </label>

                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(event) =>
                          setPassword(event.target.value)
                        }
                        disabled={authenticationLoading}
                        required
                        minLength={8}
                        className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-50"
                      />

                      <p className="mt-1.5 text-xs text-zinc-400">
                        Minimum 8 characters.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={authenticationLoading}
                      className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-zinc-950 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending verification code...
                        </>
                      ) : (
                        <>
                          Continue
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
                    onCredential={handleGoogleCredential}
                    disabled={authenticationLoading}
                  />

                  {googleLoading && (
                    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-500">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Creating your account with Google...
                    </div>
                  )}

                  <p className="mt-7 text-center text-sm text-zinc-500">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-zinc-950 hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  {/* Email verification */}
                  <button
                    type="button"
                    onClick={handleBackToSignup}
                    disabled={authenticationLoading}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100">
                    <CheckCircle2 className="h-6 w-6 text-zinc-800" />
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                    Verify your email
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    We sent a 6-digit verification code to{" "}
                    <span className="font-medium text-zinc-800">
                      {email}
                    </span>
                    .
                  </p>

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
                    onSubmit={handleVerifyEmail}
                  >
                    <div>
                      <label
                        htmlFor="verificationCode"
                        className="mb-2 block text-sm font-medium text-zinc-800"
                      >
                        Verification code
                      </label>

                      <input
                        id="verificationCode"
                        name="verification_code"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="000000"
                        value={verificationCode}
                        onChange={(event) => {
                          const value =
                            event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 6);

                          setVerificationCode(value);
                        }}
                        disabled={authenticationLoading}
                        required
                        autoFocus
                        className="h-14 w-full rounded-lg border border-zinc-200 bg-white px-3.5 text-center text-2xl font-semibold tracking-[0.45em] outline-none transition placeholder:text-zinc-300 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-50"
                      />

                      <p className="mt-2 text-xs text-zinc-400">
                        The code expires in 10 minutes.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={
                        authenticationLoading ||
                        verificationCode.length !== 6
                      }
                      className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-zinc-950 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {verificationLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify email
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-zinc-500">
                      Didn&apos;t receive the code?
                    </p>

                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={
                        authenticationLoading ||
                        resendCooldown > 0
                      }
                      className="mt-2 text-sm font-semibold text-zinc-950 hover:underline disabled:cursor-not-allowed disabled:text-zinc-400 disabled:no-underline"
                    >
                      {resendCooldown > 0
                        ? `Resend code in ${resendCooldown}s`
                        : "Resend verification code"}
                    </button>
                  </div>

                  <div className="mt-6 rounded-lg bg-zinc-50 px-4 py-3 text-xs leading-5 text-zinc-500">
                    Check your spam or junk folder if you don&apos;t
                    see the email.
                  </div>
                </>
              )}
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-zinc-400">
              By creating an account, you agree to our
              Terms and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}