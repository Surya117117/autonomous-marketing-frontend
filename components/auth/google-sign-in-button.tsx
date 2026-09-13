"use client";

import { useEffect, useRef, useState } from "react";

type GoogleCredentialResponse = {
  credential: string;
};

type GoogleSignInButtonProps = {
  onCredential: (credential: string) => Promise<void> | void;
  disabled?: boolean;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (
              response: GoogleCredentialResponse,
            ) => void | Promise<void>;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "small" | "medium" | "large";
              width?: number;
              text?: "signin_with" | "signup_with" | "continue_with";
              shape?: "rectangular" | "pill" | "circle" | "square";
              logo_alignment?: "left" | "center";
            },
          ) => void;
        };
      };
    };
  }
}

const GOOGLE_SCRIPT_ID = "google-identity-services-script";

export function GoogleSignInButton({
  onCredential,
  disabled = false,
}: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(onCredential);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    callbackRef.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      console.error(
        "NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured.",
      );
      return;
    }

    const existingScript =
      document.getElementById(GOOGLE_SCRIPT_ID);

    if (existingScript) {
      if (window.google) {
        setScriptReady(true);
      } else {
        existingScript.addEventListener(
          "load",
          () => setScriptReady(true),
          { once: true },
        );
      }

      return;
    }

    const script = document.createElement("script");

    script.id = GOOGLE_SCRIPT_ID;
    script.src =
      "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setScriptReady(true);
    };

    script.onerror = () => {
      console.error(
        "Unable to load Google Identity Services.",
      );
    };

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (
      !scriptReady ||
      !window.google ||
      !buttonRef.current
    ) {
      return;
    }

    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      return;
    }

    buttonRef.current.innerHTML = "";

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        if (!response?.credential) {
          return;
        }

        void callbackRef.current(
          response.credential,
        );
      },
    });

    window.google.accounts.id.renderButton(
      buttonRef.current,
      {
        theme: "outline",
        size: "large",
        width: 380,
        text: "continue_with",
        shape: "rectangular",
        logo_alignment: "left",
      },
    );
  }, [scriptReady]);

  return (
    <div
      className={`w-full ${
        disabled
          ? "pointer-events-none opacity-50"
          : ""
      }`}
      aria-disabled={disabled}
    >
      <div
        ref={buttonRef}
        className="flex min-h-11 w-full items-center justify-center"
      />

      {!scriptReady && (
        <div className="flex h-11 w-full items-center justify-center rounded-lg border border-zinc-200 text-sm font-medium text-zinc-500">
          Loading Google...
        </div>
      )}
    </div>
  );
}