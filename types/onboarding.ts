export interface OnboardingData {
  businessName: string;
  industry: string;
  website: string;
  description: string;

  country: string;
  city: string;

  targetAudience: string;
  targetLocation: string;

  goals: string[];
  platforms: string[];

  brandTone: string;

  catalogueFiles: File[];
}