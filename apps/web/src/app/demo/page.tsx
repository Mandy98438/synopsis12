import { type Metadata } from "next";
import Link from "next/link";
import { getDemoKard } from "@/lib/demo-kard";
import { KardCard } from "@/components/kard/kard-card";

export const metadata: Metadata = {
  title: "Demo Kard - See how it works",
  description: "See a live example of a Kard - your digital identity card for everywhere.",
};

export default function DemoPage() {
  const kard = getDemoKard();

  const socials = {
    linkedin: kard.links.find((l) => l.type.toLowerCase() === "linkedin")?.url,
    twitter: kard.links.find((l) => l.type.toLowerCase() === "twitter" || l.type.toLowerCase() === "x")?.url,
    github: kard.links.find((l) => l.type.toLowerCase() === "github")?.url,
  };

  return (
    <main className="page-reveal min-h-screen bg-[#f6f3ee] p-4 text-black">
      <div className="kard-container flex min-h-screen flex-col items-center justify-center py-10">
        <Link href="/" className="mb-8 text-sm text-[#666] hover:text-black">Back to Kard</Link>
        <p className="mb-4 text-sm text-[#888]">Live demo</p>

        <KardCard
          name={`${kard.firstName} ${kard.lastName}`}
          role={kard.headline}
          company={kard.company ?? ""}
          photoUrl={kard.avatarUrl ?? undefined}
          kardId={kard.username}
          socials={socials}
        />

        <div className="mt-8 text-center">
          <p className="mb-4 text-sm text-[#666]">Like what you see?</p>
          <Link href="/auth/signin" className="glow-cta inline-flex rounded-[24px] bg-[#ff6600] px-7 py-3 text-sm font-medium text-white shadow-[var(--shadow-sm)]">
            Create your Kard
          </Link>
        </div>
      </div>
    </main>
  );
}

