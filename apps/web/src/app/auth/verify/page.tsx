import Link from "next/link";
import { KardLogo } from "@/components/kard/kard-logo";

export default function VerifyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f3ee] px-4 py-12 text-black">
      <div className="kard-arc w-full max-w-[420px] rounded-[24px] bg-white p-8 text-center shadow-[var(--shadow-xl)]">
        <KardLogo size="md" isDark={false} className="mx-auto mb-10 justify-center" />
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#f6f3ee]">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M3 8l11 7.5L25 8" stroke="#ff6600" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="3" y="5" width="22" height="18" rx="2.5" stroke="#ff6600" strokeWidth="1.5" />
          </svg>
        </div>
        <h1 className="mb-3 text-3xl font-medium">Check your inbox</h1>
        <p className="mb-2 text-sm leading-relaxed text-[#666]">
          A magic link is on its way to your email. Click it to sign in, no password needed.
        </p>
        <p className="mb-8 text-xs text-[#888]">
          Link expires in 24 hours. Check your spam folder if you don&apos;t see it.
        </p>
        <div className="mb-6 h-px bg-[#e5e5e5]" />
        <Link href="/auth/signin" className="text-sm font-medium text-black">
          Back to sign in
        </Link>
      </div>
    </main>
  );
}
