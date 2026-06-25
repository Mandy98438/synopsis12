"use client";
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { KardLogo } from "@/components/kard/kard-logo";

const ERROR_MESSAGES: Record<string, { title: string; detail: string }> = {
  Configuration: { title: "Configuration error", detail: "There's an issue with the auth setup. Please try again later." },
  AccessDenied: { title: "Access denied", detail: "You don't have permission to sign in." },
  Verification: { title: "Link expired", detail: "This magic link has expired or already been used. Request a new one." },
  Default: { title: "Something went wrong", detail: "An unexpected error occurred. Please try signing in again." },
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "Default";
  const { title, detail } = ERROR_MESSAGES[error] ?? ERROR_MESSAGES.Default!;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f3ee] px-4 py-12 text-black">
      <div className="w-full max-w-[420px] rounded-[24px] bg-white p-8 text-center shadow-[var(--shadow-xl)]">
        <KardLogo size="md" isDark={false} className="mx-auto mb-10 justify-center" />
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 6v5M10 14h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-medium">{title}</h1>
        <p className="mb-8 text-sm leading-relaxed text-[#666]">{detail}</p>
        <Link href="/auth/signin" className="inline-flex rounded-[24px] bg-[#ff6600] px-6 py-3 text-sm font-medium text-white shadow-[var(--shadow-sm)]">
          Back to sign in
        </Link>
      </div>
    </main>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={null}>
      <AuthErrorContent />
    </Suspense>
  );
}
