"use client";
export const dynamic = "force-dynamic";
import { Suspense, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { KardLogo } from "@/components/kard/kard-logo";

type Step = "verify" | "ready";

const PLATFORM_BADGES = [
  { label: "LinkedIn", bg: "#0077B5", short: "in" },
  { label: "GitHub", bg: "#161b22", short: "gh" },
  { label: "Google", bg: "#000000", short: "G" },
];

function OnboardingContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>(searchParams.get("step") === "ready" ? "ready" : "verify");
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (session === null) router.push("/auth/signin");
  }, [session, router]);

  const handleLinkedIn = async () => {
    setConnecting(true);
    await signIn("linkedin", { callbackUrl: "/onboarding?step=ready" });
  };

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-black">
      <div className="fixed inset-x-0 top-0 z-10 h-1 bg-white">
        <div className="h-full bg-[#ff6600] transition-all duration-500" style={{ width: step === "verify" ? "50%" : "100%" }} />
      </div>
      <div className="kard-container flex min-h-screen flex-col items-center justify-center py-16">
        <KardLogo size="md" isDark={false} className="mb-10" />
        <div className="kard-arc w-full max-w-[430px] rounded-[24px] bg-white p-8 shadow-[var(--shadow-xl)]">
          {step === "verify" ? (
            <VerifyStep connecting={connecting} onConnect={handleLinkedIn} onSkip={() => setStep("ready")} />
          ) : (
            <ReadyStep onBuild={() => router.push("/dashboard/new")} />
          )}
        </div>
      </div>
    </main>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={null}>
      <OnboardingContent />
    </Suspense>
  );
}

function VerifyStep({ connecting, onConnect, onSkip }: { connecting: boolean; onConnect: () => void; onSkip: () => void }) {
  return (
    <div>
      <p className="mb-8 text-center text-sm text-[#888]">Step 1 of 2</p>
      <div className="mb-6 flex justify-center">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#f6f3ee]">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <circle cx="13" cy="13" r="11.5" stroke="#ff6600" strokeWidth="1.3" />
              <path d="M8 13l3.5 3.5L18 9" stroke="#ff6600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 flex gap-1">
            {PLATFORM_BADGES.map((p) => (
              <div key={p.label} className="flex h-5 w-5 items-center justify-center rounded-full border border-white text-[7px] font-bold text-white" style={{ background: p.bg }}>
                {p.short}
              </div>
            ))}
          </div>
        </div>
      </div>
      <h1 className="mb-3 text-center text-3xl font-medium">Verify your identity</h1>
      <p className="mx-auto mb-8 max-w-xs text-center text-sm leading-relaxed text-[#666]">
        Connect LinkedIn to get your verified badge. It proves this Kard is really you, building trust with everyone you share it with.
      </p>
      <div className="mb-6 rounded-[24px] bg-[#ebfef6] p-5">
        {["Verified badge on your card", "Higher trust with people you share with", "Protection against impersonation"].map((item) => (
          <div key={item} className="flex items-center gap-3 py-2">
            <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#00cc88]">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1.5 4l1.5 1.5L6.5 2" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs text-[#444]">{item}</span>
          </div>
        ))}
      </div>
      <button onClick={onConnect} disabled={connecting} className="mb-3 flex w-full items-center justify-center gap-2 rounded-[24px] bg-[#0077B5] py-3.5 text-sm font-medium text-white disabled:opacity-50">
        {connecting ? "Connecting to LinkedIn..." : "Connect LinkedIn"}
      </button>
      <button onClick={onSkip} className="w-full py-2.5 text-xs text-[#888] hover:text-black">
        Skip for now - I&apos;ll verify later
      </button>
      <p className="mt-4 text-center text-[10px] leading-relaxed text-[#888]">
        We only read your public profile to confirm ownership.<br />Nothing is ever posted on your behalf.
      </p>
    </div>
  );
}

function ReadyStep({ onBuild }: { onBuild: () => void }) {
  return (
    <div className="text-center">
      <p className="mb-8 text-sm text-[#888]">Step 2 of 2</p>
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#ebfef6]">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M6 14l5.5 5.5L22 8" stroke="#00a66f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mb-3 text-3xl font-medium">You&apos;re all set</h1>
      <p className="mx-auto mb-8 max-w-xs text-sm leading-relaxed text-[#666]">
        Now let&apos;s build your Kard. Add your photo, links, and choose how you want to show up in the world.
      </p>
      <div className="mb-8 rounded-[24px] bg-[#f6f3ee] p-5 text-left">
        <p className="mb-4 text-xs uppercase text-[#888]">What you&apos;ll create</p>
        <div className="flex flex-col gap-3">
          {[
            { label: "Photo", desc: "Your face on the card" },
            { label: "Links", desc: "LinkedIn, GitHub, Instagram" },
            { label: "Card mode", desc: "Minimal, Professional, Personal" },
            { label: "QR code", desc: "Share in person instantly" },
          ].map((item) => (
            <div key={item.label}>
              <span className="text-xs font-medium text-black">{item.label}</span>
              <span className="text-xs text-[#666]"> - {item.desc}</span>
            </div>
          ))}
        </div>
      </div>
      <button onClick={onBuild} className="w-full rounded-[24px] bg-[#ff6600] py-3.5 text-sm font-medium text-white shadow-[var(--shadow-sm)]">
        Build my Kard
      </button>
    </div>
  );
}
