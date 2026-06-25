"use client";

import Link from "next/link";
import { KardLogo } from "@/components/kard/kard-logo";
import { TextLoop } from "@/components/core/text-loop";
import { InView } from "@/components/core/in-view";
import { Spotlight } from "@/components/core/spotlight";
import { ProgressiveBlur } from "@/components/core/progressive-blur";
import { motion } from "motion/react";
import { 
  CreditCard, 
  ShieldCheck, 
  QrCode, 
  EyeOff, 
  BarChart3, 
  SunMoon 
} from "lucide-react";

const steps = [
  { step: "01", title: "Build your Kard", desc: "Add your photo, links, and choose what to show. Takes 2 minutes." },
  { step: "02", title: "Share instantly", desc: "Get a unique URL and QR code. Share in person, scan and done." },
  { step: "03", title: "Always up to date", desc: "Update once, reflects everywhere your card has been shared." },
];

const features = [
  {
    title: "3 card modes",
    short: "Minimal, Professional, Personal.",
    full: "Share the right version of yourself for every context — from a quick casual intro to a full professional profile. Each mode has its own URL.",
    icon: CreditCard,
    tone: "bg-[#f6f3ee]",
  },
  {
    title: "Verified identity",
    short: "LinkedIn OAuth, 4 trust levels.",
    full: "Connect LinkedIn, GitHub, or Google to earn a visible trust badge. Up to level 3 — hard to fake, instantly readable by anyone who views your card.",
    icon: ShieldCheck,
    tone: "bg-[#f6f1fe]",
  },
  {
    title: "QR + short code",
    short: "Scan or type KRD-XXXX.",
    full: "No app required. Works in any camera or browser. The short code is a fallback for when scanning isn't practical — just read it aloud.",
    icon: QrCode,
    tone: "bg-[#ebfef6]",
  },
  {
    title: "Zero tracking",
    short: "No cookies. No fingerprinting.",
    full: "Viewers leave no trace — ever. One line at the bottom of every public card confirms it. This is Kard's core trust promise, baked in by design.",
    icon: EyeOff,
    tone: "bg-white",
  },
  {
    title: "Owner analytics",
    short: "Views and clicks, yours only.",
    full: "See how your card is performing — total views, link clicks, referrer source. All anonymous aggregates. Nothing personal, nothing stored about viewers.",
    icon: BarChart3,
    tone: "bg-[#fff7ed]",
  },
  {
    title: "Dark + light themes",
    short: "Two themes, one brand.",
    full: "Dark surface or warm off-white — both tied together by the same orange accent bar at the top of every card. Consistent identity regardless of theme.",
    icon: SunMoon,
    tone: "bg-[#eef7ff]",
  },
];

export default function HomeClient() {
  return (
    <main className="page-reveal min-h-screen bg-white text-black">
      <nav className="kard-container flex items-center justify-between py-6">
        <KardLogo size="md" isDark={false} />
        <div className="hidden items-center gap-7 text-sm text-black/70 sm:flex">
          <Link href="/demo" className="hover:text-black">Demo</Link>
          <Link href="/privacy" className="hover:text-black">Privacy</Link>
          <Link href="/terms" className="hover:text-black">Terms</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth/signin" className="hidden rounded-lg border border-black px-4 py-2 text-sm font-medium sm:inline-flex">
            Sign in
          </Link>
          <Link href="/auth/signin" className="glow-cta rounded-[24px] bg-[#ff6600] px-5 py-2.5 text-sm font-medium text-white shadow-[var(--shadow-sm)]">
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="kard-container overflow-hidden rounded-b-[24px] bg-black text-white">
        <div className="kard-arc grid min-h-[620px] items-center gap-12 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-16">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70">
              <span className="h-2 w-2 rounded-full bg-[#00cc88]" />
              Digital identity cards for the real world
            </div>
            <h1 className="max-w-3xl text-5xl font-medium leading-none md:text-7xl">
              One card. Every connection.
            </h1>
            
            {/* Custom spring variants text loop */}
            <div className="mt-5 text-sm text-white/65 md:text-base flex items-center gap-1.5 justify-start">
              <span>Built for</span>
              <TextLoop
                className="font-medium text-white overflow-y-clip h-6"
                transition={{
                  type: "spring",
                  stiffness: 900,
                  damping: 80,
                  mass: 10,
                }}
                variants={{
                  initial: {
                    y: 20,
                    rotateX: 90,
                    opacity: 0,
                    filter: "blur(4px)",
                  },
                  animate: {
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                  },
                  exit: {
                    y: -20,
                    rotateX: -90,
                    opacity: 0,
                    filter: "blur(4px)",
                  },
                }}
              >
                <span>LinkedIn</span>
                <span>GitHub</span>
                <span>Twitter</span>
                <span>real-world intros</span>
              </TextLoop>
            </div>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
              Share your complete identity instantly with a single link or QR code. No app needed.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/auth/signin" className="glow-cta inline-flex items-center justify-center rounded-[24px] bg-[#ff6600] px-9 py-3.5 text-base font-medium text-white shadow-[var(--shadow-sm)]">
                Create your Kard
              </Link>
              <Link href="/demo" className="inline-flex items-center justify-center rounded-lg border border-white/35 px-6 py-3 text-base font-medium text-white">
                View demo
              </Link>
            </div>
          </div>

          {/* Premium Preview Kard */}
          <div className="relative mx-auto w-full max-w-[430px]">
            <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full border border-[#aa8855]/40" />
            <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full border border-[#5c2999]/35" />
            <div className="spotlight-card inview-pop relative rounded-[24px] bg-[#f6f3ee] p-5 text-black shadow-[rgba(0,0,0,0.5)_0px_16px_32px_0px] overflow-hidden">
              <Spotlight 
                className="from-orange-500/10 via-orange-600/5 to-transparent blur-2xl"
                size={140}
              />
              <div className="rounded-[21.6px] bg-black p-4 text-white relative overflow-hidden">
                <div className="mb-20 flex items-center justify-between">
                  <KardLogo size="sm" isDark muted />
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs">kard.io/maya</span>
                </div>
                <div className="space-y-3 relative z-10">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-[#ff6600]">
                    <ProgressiveBlur 
                      className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full z-10"
                      blurIntensity={3}
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-medium">Maya Chen</p>
                    <p className="text-sm text-white/55">Product Designer</p>
                  </div>
                </div>
              </div>
              <div className="pop-grid mt-4 grid grid-cols-3 gap-3">
                {["QR", "Links", "Verify"].map((item) => (
                  <div key={item} className="spotlight-card rounded-2xl bg-white p-3 text-center text-sm font-medium shadow-[var(--shadow-sm)]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px", once: true }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        as="section"
        className="section-reveal bg-[#f6f3ee] py-20"
      >
        <div className="kard-container">
          <p className="mb-10 text-center text-sm text-[#888]">How it works</p>
          <InView
            viewOptions={{ once: true, margin: "0px 0px -150px 0px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            <div className="pop-grid grid gap-5 md:grid-cols-3">
              {steps.map((item) => (
                <motion.div 
                  key={item.step}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 30, filter: "blur(8px)" },
                    visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="spotlight-card rounded-[24px] bg-white p-8 shadow-[var(--shadow-xl)]"
                >
                  <p className="mb-5 text-sm font-medium text-[#ff6600]">{item.step}</p>
                  <h3 className="mb-3 text-2xl font-medium">{item.title}</h3>
                  <p className="text-base leading-relaxed text-[#666]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </InView>
        </div>
      </InView>

      {/* Features Section */}
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px", once: true }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        as="section"
        className="section-reveal kard-container py-20"
      >
        <div className="accent-bar w-7 h-[3px] bg-[#ff6600] rounded-sm mb-4" />
        <p className="mb-2 text-xs tracking-widest uppercase text-[#888]">Everything you need</p>
        <h1 className="max-w-2xl text-4xl font-medium leading-tight text-black mb-3">
          A polished identity surface<br />that stays <span className="text-[#ff6600]">yours.</span>
        </h1>
        <p className="text-sm text-[#666] mb-10 max-w-[480px]">
          One card. One link. Every context — from a first handshake to a portfolio share. Always up to date, never out of print.
        </p>

        <InView
          viewOptions={{ once: true, margin: "0px 0px -150px 0px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
        >
          <div className="pop-grid grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={{
                  hidden: { opacity: 0, scale: 0.92, y: 25, filter: "blur(6px)" },
                  visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`${feature.tone} feature-reveal-card spotlight-card kard-arc min-h-[190px] rounded-[18px] border border-[#e5e5e5] p-5 relative overflow-hidden`}
              >
                <Spotlight 
                  className="from-orange-500/10 via-orange-600/5 to-transparent blur-xl"
                  size={120}
                />
                <div className="feature-icon mb-5 flex h-10 w-10 items-center justify-center rounded-[14px] bg-white text-[#888] shadow-[var(--shadow-sm)] relative z-10">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-3 text-base font-medium leading-snug relative z-10">{feature.title}</h3>
                <div className="feature-text-block relative z-10">
                  <p className="feature-short text-sm leading-relaxed text-[#666]">{feature.short}</p>
                  <p className="feature-full text-sm leading-relaxed text-[#666]">{feature.full}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </InView>

        <div className="flex items-center gap-3 mt-10">
          <Link href="/auth/signin" className="glow-cta inline-flex items-center justify-center rounded-[24px] bg-[#ff6600] px-7 py-3 text-sm font-medium text-white shadow-[var(--shadow-sm)]">
            Start free ↗
          </Link>
          <Link href="/demo" className="inline-flex items-center justify-center rounded-[24px] border border-[#e5e5e5] px-6 py-3 text-sm font-medium text-[#666] hover:text-black transition-colors bg-transparent">
            See how it works
          </Link>
        </div>
        <p className="text-xs text-[#888] mt-3">No credit card required &nbsp;·&nbsp; Free tier includes 2 cards</p>
      </InView>

      {/* Privacy Section */}
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px", once: true }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        as="section"
        className="bg-[#ebfef6] py-20"
      >
        <div className="kard-container text-center">
          <p className="mb-4 text-sm text-[#00a66f]">Privacy first</p>
          <h2 className="mx-auto max-w-2xl text-4xl font-medium leading-tight">We collect zero data about your viewers.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#555]">
            No cookies. No tracking. No fingerprinting. When someone views your Kard, nothing is collected about them.
          </p>
        </div>
      </InView>

      {/* Pricing Section */}
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px", once: true }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        as="section"
        className="kard-container py-20"
      >
        <p className="mb-10 text-center text-sm text-[#888]">Pricing</p>
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          <div className="rounded-[24px] bg-[#f6f3ee] p-8 relative overflow-hidden">
            <Spotlight 
              className="from-zinc-400/10 to-transparent blur-xl"
              size={150}
            />
            <p className="font-medium">Free</p>
            <p className="my-4 text-5xl font-medium">Rs. 0</p>
            <div className="mb-8 space-y-3">
              {["1 Kard", "QR + short code", "LinkedIn verification", "3 card modes", "Save contact"].map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-[#555]">
                  <span className="h-2 w-2 rounded-full bg-[#00cc88]" />{f}
                </div>
              ))}
            </div>
            <Link href="/auth/signin" className="block rounded-[24px] border border-black px-5 py-3 text-center text-sm font-medium bg-white hover:bg-neutral-50 transition-colors">
              Get started free
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-[24px] bg-black p-8 text-white">
            <div className="absolute inset-x-0 top-0 h-1 bg-[#ff6600]" />
            <Spotlight 
              className="from-orange-500/15 via-orange-600/5 to-transparent blur-xl"
              size={150}
            />
            <p className="font-medium text-white/75">Pro</p>
            <p className="my-4 text-5xl font-medium">Soon</p>
            <div className="mb-8 space-y-3">
              {["Everything in Free", "Multiple Kards", "Full analytics", "Custom themes", "Priority support"].map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-white/65">
                  <span className="h-2 w-2 rounded-full bg-[#ff6600]" />{f}
                </div>
              ))}
            </div>
            <div className="rounded-[24px] bg-white/10 px-5 py-3 text-center text-sm font-medium text-white">
              Coming soon
            </div>
          </div>
        </div>
      </InView>

      {/* CTA Section */}
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px", once: true }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        as="section"
        className="bg-[#f6f1fe] py-20 text-center"
      >
        <div className="kard-container">
          <h2 className="text-4xl font-medium">Ready to build your Kard?</h2>
          <p className="mt-4 text-[#666]">Takes 2 minutes. No credit card needed.</p>
          <Link href="/auth/signin" className="glow-cta mt-8 inline-flex rounded-[24px] bg-[#ff6600] px-9 py-3.5 text-base font-medium text-white shadow-[var(--shadow-sm)]">
            Create your Kard
          </Link>
        </div>
      </InView>

      <footer className="kard-container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <KardLogo size="sm" isDark={false} muted />
        <div className="flex items-center gap-5 text-sm text-[#888]">
          <Link href="/terms" className="hover:text-black">Terms</Link>
          <Link href="/privacy" className="hover:text-black">Privacy</Link>
          <span>2025 Kard</span>
        </div>
      </footer>
    </main>
  );
}
