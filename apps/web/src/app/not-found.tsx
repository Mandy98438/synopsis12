import Link from "next/link";
import { KardLogo } from "@/components/kard/kard-logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f6f3ee] p-6 text-center text-black">
      <div className="w-full max-w-[420px] rounded-[24px] bg-white p-8 shadow-[var(--shadow-xl)]">
        <KardLogo size="md" isDark={false} className="mx-auto mb-10 justify-center" />
        <p className="mb-4 text-xs font-medium text-[#888]">404</p>
        <h1 className="mb-3 text-3xl font-medium">This Kard doesn&apos;t exist</h1>
        <p className="mb-8 text-sm text-[#666]">The card may have been removed or the username is wrong.</p>
        <Link href="/" className="inline-flex rounded-[24px] bg-[#ff6600] px-6 py-3 text-sm font-medium text-white shadow-[var(--shadow-sm)]">
          Go home
        </Link>
      </div>
    </main>
  );
}
