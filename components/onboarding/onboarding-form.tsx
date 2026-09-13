"use client";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Globe,
  Loader2,
  RotateCcw,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { OnboardingData } from "@/types/onboarding";
import {
  createAudience,
  createBrand,
  createBusinessAccount,
  createBusinessProfile,
  createMarketingPreferences,
} from "@/lib/api/onboarding";
import { ApiError } from "@/lib/api/client";
import { saveTenantContext } from "@/lib/auth";

const steps = [
  {
    number: 1,
    title: "Your business",
    description: "Tell us about your business.",
    icon: Globe,
  },
  {
    number: 2,
    title: "Your audience",
    description: "Who are you trying to reach?",
    icon: Users,
  },
  {
    number: 3,
    title: "Your goals",
    description:
      "What do you want your marketing to achieve?",
    icon: Target,
  },
  {
    number: 4,
    title: "Your brand",
    description:
      "Give the AI the information it needs.",
    icon: Zap,
  },
];

const goalOptions = [
  "Increase sales",
  "Generate leads",
  "Build brand awareness",
  "Grow social media",
  "Drive website traffic",
  "Launch a new product",
];

const emptyData: OnboardingData = {
  businessName: "",
  industry: "",
  website: "",
  description: "",
  country: "",
  city: "",
  targetAudience: "",
  targetLocation: "",
  goals: [],
  platforms: [],
  brandTone: "",
  catalogueFiles: [],
};

export function OnboardingForm() {
  const router = useRouter();

  const [currentStep, setCurrentStep] =
    useState(1);

  const [data, setData] =
    useState<OnboardingData>(emptyData);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const updateField = <
    K extends keyof OnboardingData,
  >(
    field: K,
    value: OnboardingData[K],
  ) => {
    setData((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (error) {
      setError(null);
    }
  };

  const toggleArrayValue = (
    field: "goals",
    value: string,
  ) => {
    setData((previous) => {
      const current = previous[field];

      return {
        ...previous,
        [field]: current.includes(value)
          ? current.filter(
              (item) => item !== value,
            )
          : [...current, value],
      };
    });

    if (error) {
      setError(null);
    }
  };

  const validateStep = (): boolean => {
    setError(null);

    if (currentStep === 1) {
      if (!data.businessName.trim()) {
        setError(
          "Please enter your business name.",
        );
        return false;
      }

      if (!data.industry.trim()) {
        setError(
          "Please enter your industry.",
        );
        return false;
      }

      if (!data.description.trim()) {
        setError(
          "Please tell us about your business.",
        );
        return false;
      }

      if (!data.country.trim()) {
        setError(
          "Please enter your country.",
        );
        return false;
      }
    }

    if (currentStep === 2) {
      if (!data.targetAudience.trim()) {
        setError(
          "Please describe your target audience.",
        );
        return false;
      }

      if (!data.targetLocation.trim()) {
        setError(
          "Please enter your target location.",
        );
        return false;
      }
    }

    if (currentStep === 3) {
      if (data.goals.length === 0) {
        setError(
          "Please select at least one marketing goal.",
        );
        return false;
      }
    }

    if (currentStep === 4) {
      if (!data.brandTone.trim()) {
        setError(
          "Please describe your brand tone.",
        );
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) {
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep(
        (step) => step + 1,
      );
    }
  };

  const previousStep = () => {
    if (
      currentStep > 1 &&
      !isSubmitting
    ) {
      setCurrentStep(
        (step) => step - 1,
      );
      setError(null);
    }
  };

  const completeOnboarding = async () => {
    if (!validateStep()) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      /*
       * 1. Create the tenant's Business Account.
       *
       * The response contains both:
       * - businessAccount.id
       * - businessAccount.tenant_id
       */
      const businessAccount =
        await createBusinessAccount({
          name: data.businessName.trim(),
        });

      const businessAccountId =
        businessAccount.id;

      saveTenantContext(
        businessAccount.tenant_id,
        businessAccountId,
      );

      /*
       * 2. Create the Business Profile.
       */
      await createBusinessProfile({
        business_account_id:
          businessAccountId,
        business_name:
          data.businessName.trim(),
        category:
          data.industry.trim(),
        description:
          data.description.trim(),
        website:
          data.website.trim() ||
          undefined,
        country:
          data.country.trim(),
        city:
          data.city.trim() ||
          undefined,
      });

      /*
       * 3. Create the Target Audience.
       */
      const locations =
        data.targetLocation
          .split(",")
          .map(
            (location) =>
              location.trim(),
          )
          .filter(Boolean);

      await createAudience({
        business_account_id:
          businessAccountId,
        name: data.targetAudience
          .trim()
          .slice(0, 255),
        description:
          data.targetAudience.trim(),
        locations,
      });

      /*
       * 4. Create the Brand Profile.
       */
      await createBrand({
        business_account_id:
          businessAccountId,
        brand_name:
          data.businessName.trim(),
        brand_description:
          data.description.trim(),
        industry:
          data.industry.trim(),
        tone:
          data.brandTone.trim(),
        website:
          data.website.trim() ||
          undefined,
      });

      /*
       * 5. Create Marketing Preferences.
       *
       * The backend currently has no "platforms"
       * field, so platforms are not sent here.
       */
      await createMarketingPreferences({
        business_account_id:
          businessAccountId,
        primary_goal:
          data.goals[0],
        secondary_goals:
          data.goals.slice(1),
        content_types: [],
        approval_mode:
          "autonomous",
        timezone:
          Intl.DateTimeFormat()
            .resolvedOptions()
            .timeZone || "UTC",
        preferred_posting_time:
          "10:00",
        posting_frequency:
          "daily",
      });

      /*
       * Catalogue is intentionally NOT handled here.
       *
       * Users can upload and manage catalogue images
       * separately from the Catalogue workspace.
       */

      /*
       * Navigate to the dashboard after successful
       * onboarding.
       */
      router.push("/dashboard");
    } catch (submissionError) {
      if (
        submissionError instanceof
        ApiError
      ) {
        setError(
          submissionError.detail,
        );
      } else if (
        submissionError instanceof Error
      ) {
        setError(
          submissionError.message,
        );
      } else {
        setError(
          "We could not complete your setup. Please try again.",
        );
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    if (isSubmitting) {
      return;
    }

    setData({
      ...emptyData,
      catalogueFiles: [],
    });

    setCurrentStep(1);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl font-sans">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 font-bold text-zinc-900"
        >
          <img
            src="/logo/app logo.png"
            alt="Logo"
            className="h-8 w-8 object-contain"
          />

          <span className="text-xl tracking-tight">
            Marketing System
          </span>
        </Link>

        <button
          type="button"
          onClick={resetForm}
          disabled={isSubmitting}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-50"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between">
          {steps.map(
            (step, index) => {
              const Icon = step.icon;

              const completed =
                currentStep >
                step.number;

              const active =
                currentStep ===
                step.number;

              return (
                <div
                  key={step.number}
                  className="flex flex-1 items-center"
                >
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      disabled={
                        isSubmitting
                      }
                      onClick={() => {
                        if (
                          step.number <
                          currentStep
                        ) {
                          setCurrentStep(
                            step.number,
                          );
                          setError(null);
                        }
                      }}
                      className={
                        completed
                          ? "flex h-11 w-11 items-center justify-center rounded-full border border-purple-600 bg-purple-600 text-white transition hover:scale-105 disabled:pointer-events-none"
                          : active
                            ? "flex h-11 w-11 items-center justify-center rounded-full border-2 border-purple-600 bg-purple-600 text-white shadow-md shadow-purple-200 transition hover:scale-105"
                            : "flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 transition"
                      }
                    >
                      {completed ? (
                        <Check className="h-5 w-5 stroke-[2.5]" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </button>

                    <span
                      className={
                        active ||
                        completed
                          ? "mt-2 hidden text-xs font-bold text-zinc-900 sm:block"
                          : "mt-2 hidden text-xs font-medium text-zinc-400 sm:block"
                      }
                    >
                      {step.title}
                    </span>
                  </div>

                  {index <
                    steps.length -
                      1 && (
                    <div
                      className={
                        currentStep >
                        step.number
                          ? "mx-3 h-0.5 flex-1 bg-purple-600"
                          : "mx-3 h-0.5 flex-1 bg-zinc-200"
                      }
                    />
                  )}
                </div>
              );
            },
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-purple-100/80 bg-white p-6 shadow-xl shadow-purple-500/5 sm:p-10">
        <div className="mb-8 border-b border-zinc-100 pb-6">
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-purple-600">
            Step {currentStep} of{" "}
            {steps.length}
          </p>

          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
            {
              steps[
                currentStep - 1
              ].title
            }
          </h1>

          <p className="mt-1.5 text-sm text-zinc-500">
            {
              steps[
                currentStep - 1
              ].description
            }
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-900">
                Business name
              </label>

              <input
                value={
                  data.businessName
                }
                disabled={isSubmitting}
                onChange={(event) =>
                  updateField(
                    "businessName",
                    event.target.value,
                  )
                }
                placeholder="e.g. Beyond Stories"
                className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100 placeholder:text-zinc-400 disabled:bg-zinc-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-900">
                Industry
              </label>

              <input
                value={data.industry}
                disabled={isSubmitting}
                onChange={(event) =>
                  updateField(
                    "industry",
                    event.target.value,
                  )
                }
                placeholder="e.g. Fashion, restaurant, SaaS..."
                className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100 placeholder:text-zinc-400 disabled:bg-zinc-50"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-900">
                  Country
                </label>

                <input
                  value={
                    data.country
                  }
                  disabled={
                    isSubmitting
                  }
                  onChange={(
                    event,
                  ) =>
                    updateField(
                      "country",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. India"
                  className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100 placeholder:text-zinc-400 disabled:bg-zinc-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-900">
                  City
                </label>

                <input
                  value={data.city}
                  disabled={
                    isSubmitting
                  }
                  onChange={(
                    event,
                  ) =>
                    updateField(
                      "city",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Lucknow"
                  className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100 placeholder:text-zinc-400 disabled:bg-zinc-50"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-900">
                Website
              </label>

              <input
                type="url"
                value={data.website}
                disabled={isSubmitting}
                onChange={(event) =>
                  updateField(
                    "website",
                    event.target.value,
                  )
                }
                placeholder="https://example.com"
                className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100 placeholder:text-zinc-400 disabled:bg-zinc-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-900">
                Tell us about your business
              </label>

              <textarea
                value={
                  data.description
                }
                disabled={isSubmitting}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value,
                  )
                }
                placeholder="What does your business do? What products or services do you offer?"
                rows={5}
                className="w-full resize-none rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100 placeholder:text-zinc-400 disabled:bg-zinc-50"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-900">
                Who is your target audience?
              </label>

              <textarea
                value={
                  data.targetAudience
                }
                disabled={isSubmitting}
                onChange={(event) =>
                  updateField(
                    "targetAudience",
                    event.target.value,
                  )
                }
                placeholder="Describe your ideal customer, their interests, age range, profession, needs, etc."
                rows={6}
                className="w-full resize-none rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100 placeholder:text-zinc-400 disabled:bg-zinc-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-900">
                Target location
              </label>

              <input
                value={
                  data.targetLocation
                }
                disabled={isSubmitting}
                onChange={(event) =>
                  updateField(
                    "targetLocation",
                    event.target.value,
                  )
                }
                placeholder="e.g. India, Delhi NCR, Mumbai, Bangalore"
                className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100 placeholder:text-zinc-400 disabled:bg-zinc-50"
              />

              <p className="mt-2 text-xs text-zinc-500">
                Separate multiple
                locations with
                commas.
              </p>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-3 text-sm font-semibold text-zinc-900">
                What are your marketing
                goals?
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">
                {goalOptions.map(
                  (goal) => {
                    const selected =
                      data.goals.includes(
                        goal,
                      );

                    return (
                      <button
                        type="button"
                        key={goal}
                        disabled={
                          isSubmitting
                        }
                        onClick={() =>
                          toggleArrayValue(
                            "goals",
                            goal,
                          )
                        }
                        className={
                          selected
                            ? "rounded-2xl border-2 border-purple-600 bg-purple-600 p-4 text-left text-sm font-semibold text-white shadow-sm transition disabled:opacity-60"
                            : "rounded-2xl border border-zinc-200 bg-white p-4 text-left text-sm font-medium text-zinc-800 transition hover:border-purple-300 hover:bg-purple-50/50 disabled:opacity-60"
                        }
                      >
                        <div className="flex items-center justify-between">
                          <span>
                            {goal}
                          </span>

                          {selected && (
                            <Check className="h-4 w-4 stroke-[3]" />
                          )}
                        </div>
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-8">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-900">
                Brand tone
              </label>

              <input
                value={data.brandTone}
                disabled={isSubmitting}
                onChange={(event) =>
                  updateField(
                    "brandTone",
                    event.target.value,
                  )
                }
                placeholder="e.g. Professional, friendly, bold, playful..."
                className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100 placeholder:text-zinc-400 disabled:bg-zinc-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-900">
                Brand information
              </label>

              <textarea
                value={
                  data.description
                }
                disabled={isSubmitting}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value,
                  )
                }
                placeholder="Describe your brand voice, style, positioning, products and anything else the AI should know."
                rows={6}
                className="w-full resize-none rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100 placeholder:text-zinc-400 disabled:bg-zinc-50"
              />
            </div>

            <div className="rounded-2xl border border-purple-100 bg-purple-50/50 px-5 py-4">
              <p className="text-sm font-semibold text-zinc-900">
                Your catalogue is managed separately
              </p>

              <p className="mt-1.5 text-xs leading-5 text-zinc-600">
                You can upload and manage
                product images anytime from
                the Catalogue section in your
                dashboard.
              </p>
            </div>
          </div>
        )}

        <div className="mt-10 flex items-center justify-between border-t border-zinc-100 pt-6">
          <button
            type="button"
            onClick={previousStep}
            disabled={
              currentStep === 1 ||
              isSubmitting
            }
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {currentStep <
          steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={isSubmitting}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-purple-600 px-6 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-purple-700 disabled:pointer-events-none disabled:opacity-60"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={
                completeOnboarding
              }
              disabled={isSubmitting}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-purple-600 px-6 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-purple-700 disabled:pointer-events-none disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Setting up...
                </>
              ) : (
                <>
                  Complete setup
                  <Check className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}