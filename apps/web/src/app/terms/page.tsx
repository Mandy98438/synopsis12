import { type Metadata } from "next";
import Link from "next/link";
import { KardLogo } from "@/components/kard/kard-logo";

export const metadata: Metadata = {
  title: "Terms of Service - KARD",
  description: "KARD terms of service and usage policy.",
};

const LAST_UPDATED = "June 2026";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-black">
      <div className="kard-container py-10">
        <nav className="mb-10 flex items-center justify-between">
          <KardLogo size="md" isDark={false} />
          <Link href="/" className="rounded-lg border border-black px-4 py-2 text-sm font-medium">Back</Link>
        </nav>
        <article className="mx-auto max-w-3xl rounded-[24px] bg-white p-8 shadow-[var(--shadow-xl)] md:p-12">
          <p className="mb-3 text-sm font-medium text-[#ff6600]">Legal</p>
          <h1 className="mb-2 text-4xl font-medium">Terms of Service</h1>
          <p className="mb-10 text-sm text-[#888]">Last updated {LAST_UPDATED}</p>
          <div className="space-y-8 text-base leading-relaxed text-[#555]">
            <Section title="1. Acceptance">By creating an account or using KARD, you agree to these terms. If you do not agree, do not use the service.</Section>
            <Section title="2. Your account">You are responsible for keeping your account credentials secure. You may not share, sell, or transfer your account. You must be at least 13 years old to use KARD.</Section>
            <Section title="3. Acceptable use">You agree not to impersonate another person, post misleading information, distribute spam, violate laws, or attempt to compromise the platform.</Section>
            <Section title="4. Your content">You own your content. By uploading it to KARD, you grant us a limited licence to display it on your public card.</Section>
            <Section title="5. Free and Pro plans">Free accounts may create up to 2 Kards. Pro accounts have higher limits and additional features.</Section>
            <Section title="6. Termination">We may suspend or terminate accounts that violate these terms. You may delete your account at any time from settings.</Section>
            <Section title="7. Disclaimers">KARD is provided as is without warranties of any kind. We do not guarantee uptime or that the service will be error-free.</Section>
            <Section title="8. Limitation of liability">To the maximum extent permitted by law, KARD shall not be liable for indirect, incidental, or consequential damages.</Section>
            <Section title="9. Changes">We may update these terms. Continued use after changes constitutes acceptance of the updated terms.</Section>
            <Section title="10. Contact">Questions? Email <a href="mailto:legal@kard.io" className="text-[#ff6600]">legal@kard.io</a>.</Section>
          </div>
          <div className="mt-12 flex gap-4 border-t border-[#e5e5e5] pt-8 text-sm text-[#666]">
            <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
            <Link href="/" className="hover:text-black">Back to KARD</Link>
          </div>
        </article>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-medium text-black">{title}</h2>
      <p>{children}</p>
    </section>
  );
}
