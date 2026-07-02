"use client";

import { useState } from "react";
import Link from "next/link";
import { getDemoKard } from "@/lib/demo-kard";
import { KardCard } from "@/components/kard/kard-card";
import { KARD_MODES, type KardMode } from "@/components/kard/kardModes";
import { cn } from "@/lib/cn";

export default function DemoPage() {
  const kard = getDemoKard();
  const [mode, setMode] = useState<KardMode>("dark");

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

        <div className="relative">
          <div className="absolute -left-12 top-6 z-10 flex flex-col gap-2 rounded-full border border-black/5 bg-white/90 p-2 shadow-lg" aria-label="Card style">
            {(Object.keys(KARD_MODES) as KardMode[]).map((m) => (
              <button
                key={m}
                className={cn(
                  "h-[18px] w-[18px] rounded-full border border-white shadow-[0_0_0_1px_rgba(0,0,0,0.14)] cursor-pointer transition-shadow",
                  mode === m && "ring-2 ring-[#ff6600]"
                )}
                onClick={() => setMode(m)}
                aria-label={`${KARD_MODES[m].label} mode`}
                style={{ background: KARD_MODES[m].swatch }}
              />
            ))}
          </div>

          <KardCard
            name={`${kard.firstName} ${kard.lastName}`}
            role={kard.headline}
            company={kard.company ?? ""}
            photoUrl={kard.avatarUrl ?? undefined}
            kardId={kard.username}
            socials={socials}
            theme={mode}
          />
        </div>

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
