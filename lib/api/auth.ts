import { apiRequest } from "./client";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
  business_name: string;
};

export type GoogleLoginRequest = {
  credential: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export type SignupVerificationResponse = {
  message: string;
};

export type VerifySignupEmailRequest = {
  email: string;
  code: string;
};

export type VerifySignupEmailResponse = {
  access_token: string;
  token_type: string;
};

/**
 * Start manual signup.
 *
 * IMPORTANT:
 * This does NOT create the account.
 * It requests an email verification code.
 */
export async function registerUser(
  data: RegisterRequest,
): Promise<SignupVerificationResponse> {
  return apiRequest<SignupVerificationResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Explicitly request/resend the signup verification code.
 */
export async function requestSignupVerification(
  data: RegisterRequest,
): Promise<SignupVerificationResponse> {
  return apiRequest<SignupVerificationResponse>(
    "/auth/signup/request-verification",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

/**
 * Verify the email OTP and receive the JWT.
 */
export async function verifySignupEmail(
  data: VerifySignupEmailRequest,
): Promise<VerifySignupEmailResponse> {
  return apiRequest<VerifySignupEmailResponse>("/auth/signup/verify", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginUser(
  data: LoginRequest,
): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginWithGoogle(
  data: GoogleLoginRequest,
): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/auth/google", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export type PasswordResetRequest = {
  email: string;
};

export type PasswordResetVerifyRequest = {
  email: string;
  code: string;
};

export type PasswordResetVerifyResponse = {
  reset_token: string;
};

export type PasswordResetCompleteRequest = {
  email: string;
  reset_token: string;
  new_password: string;
};

export type PasswordResetCompleteResponse = {
  message: string;
};

export async function requestPasswordReset(
  data: PasswordResetRequest,
): Promise<SignupVerificationResponse> {
  return apiRequest<SignupVerificationResponse>(
    "/auth/password-reset/request",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function verifyPasswordReset(
  data: PasswordResetVerifyRequest,
): Promise<PasswordResetVerifyResponse> {
  return apiRequest<PasswordResetVerifyResponse>(
    "/auth/password-reset/verify",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function completePasswordReset(
  data: PasswordResetCompleteRequest,
): Promise<PasswordResetCompleteResponse> {
  return apiRequest<PasswordResetCompleteResponse>(
    "/auth/password-reset/complete",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}