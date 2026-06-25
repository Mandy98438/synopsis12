import { type Metadata } from "next";
import Link from "next/link";
import { KardLogo } from "@/components/kard/kard-logo";

export const metadata: Metadata = {
  title: "Privacy Policy - KARD",
  description: "How KARD collects, uses, and protects your data.",
};

const LAST_UPDATED = "June 2026";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" eyebrow="Legal" updated={LAST_UPDATED}>
      <Section title="1. What we collect">
        <p>When you use KARD, we collect account info, card content, anonymous analytics, and standard server logs for debugging and abuse prevention.</p>
      </Section>
      <Section title="2. What we do not collect">
        <ul>
          <li>We do not sell your data to advertisers.</li>
          <li>We do not build advertising profiles.</li>
          <li>We do not track visitors beyond anonymous counts.</li>
          <li>We do not share your data except as described here.</li>
        </ul>
      </Section>
      <Section title="3. How we use your data">
        <p>We use your data to display your public Kard, send transactional emails, show card analytics, prevent abuse, and enforce our terms.</p>
      </Section>
      <Section title="4. Third-party services">
        <p>We use Supabase, Cloudinary, Resend, Upstash, and Vercel to host, deliver, and operate the product. OAuth providers receive only the data necessary to verify your identity.</p>
      </Section>
      <Section title="5. Your rights">
        <p>You can edit or delete your Kard, delete your account, or request an export of your data.</p>
      </Section>
      <Section title="6. Cookies">
        <p>We use session cookies only for authentication. We do not use advertising or tracking cookies.</p>
      </Section>
      <Section title="7. Data retention">
        <p>We retain your data while your account is active. When you delete your account, your data is permanently removed within 30 days.</p>
      </Section>
      <Section title="8. Security">
        <p>We use TLS in transit and encryption at rest. Passwords are not used; we use magic links and OAuth only.</p>
      </Section>
      <Section title="9. Contact">
        <p>Email <a href="mailto:privacy@kard.io">privacy@kard.io</a> for privacy questions or data requests.</p>
      </Section>
    </LegalPage>
  );
}

function LegalPage({ title, eyebrow, updated, children }: { title: string; eyebrow: string; updated: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-black">
      <div className="kard-container py-10">
        <nav className="mb-10 flex items-center justify-between">
          <KardLogo size="md" isDark={false} />
          <Link href="/" className="rounded-lg border border-black px-4 py-2 text-sm font-medium">Back</Link>
        </nav>
        <article className="mx-auto max-w-3xl rounded-[24px] bg-white p-8 shadow-[var(--shadow-xl)] md:p-12">
          <p className="mb-3 text-sm font-medium text-[#ff6600]">{eyebrow}</p>
          <h1 className="mb-2 text-4xl font-medium">{title}</h1>
          <p className="mb-10 text-sm text-[#888]">Last updated {updated}</p>
          <div className="space-y-8 text-base leading-relaxed text-[#555]">{children}</div>
          <div className="mt-12 flex gap-4 border-t border-[#e5e5e5] pt-8 text-sm text-[#666]">
            <Link href="/terms" className="hover:text-black">Terms of Service</Link>
            <Link href="/" className="hover:text-black">Back to KARD</Link>
          </div>
        </article>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="[&_a]:text-[#ff6600] [&_h2]:text-black [&_li]:mb-1 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
      <h2 className="mb-3 text-xl font-medium">{title}</h2>
      {children}
    </section>
  );
}
