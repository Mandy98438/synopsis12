"use client";

import Link from "next/link";
import { KardLogo } from "@/components/kard/kard-logo";
import { TextLoop } from "@/components/core/text-loop";
import { InView } from "@/components/core/in-view";
import { Spotlight } from "@/components/core/spotlight";
import KardDemoCarousel from "@/components/kard/kard-demo-carousel";
import Masonry from "@/components/core/Masonry";
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

const masonryItems = [
  { id: "1",  img: "/masonry/content1.png",  url: "#", height: 520 },
  { id: "2",  img: "/masonry/content2.png",  url: "#", height: 380 },
  { id: "3",  img: "/masonry/content3.png",  url: "#", height: 460 },
  { id: "4",  img: "/masonry/content4.png",  url: "#", height: 340 },
  { id: "5",  img: "/masonry/content5.png",  url: "#", height: 500 },
  { id: "6",  img: "/masonry/content6.png",  url: "#", height: 420 },
  { id: "7",  img: "/masonry/content7.png",  url: "#", height: 360 },
  { id: "8",  img: "/masonry/content8.png",  url: "#", height: 480 },
  { id: "9",  img: "/masonry/content9.png",  url: "#", height: 440 },
  { id: "10", img: "/masonry/content10.png", url: "#", height: 390 },
];

export default function HomeClient() {
  return (
    <main className="page-reveal min-h-screen bg-white text-black pt-24 md:pt-28">

      {/* ── Hero ── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="kard-arc grid min-h-[620px] items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col gap-6 max-w-lg">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold tracking-widest uppercase text-orange-500">
                <span className="h-2 w-2 rounded-full bg-[#00cc88]" />
                Digital identity cards for the real world
              </div>
              <h1 className="max-w-3xl text-5xl font-black tracking-tight leading-tight md:text-7xl">
                One card. Every connection.
              </h1>
              <div className="mt-5 text-sm text-white/65 md:text-base flex items-center gap-1.5 justify-start">
                <span>Built for</span>
                <TextLoop
                  className="font-medium text-white overflow-y-clip h-6"
                  transition={{ type: "spring", stiffness: 900, damping: 80, mass: 10 }}
                  variants={{
                    initial: { y: 20, rotateX: 90, opacity: 0, filter: "blur(4px)" },
                    animate: { y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)" },
                    exit: { y: -20, rotateX: -90, opacity: 0, filter: "blur(4px)" },
                  }}
                >
                  <span>LinkedIn</span>
                  <span>GitHub</span>
                  <span>Twitter</span>
                  <span>real-world intros</span>
                </TextLoop>
              </div>
              <p className="mt-6 max-w-xl text-base md:text-lg text-gray-400 leading-relaxed">
                One link. One impact. Everlasting impression. No app needed.
              </p>
              <div className="mt-10 flex gap-4 items-center flex-wrap">
                <Link href="/auth/signin" className="glow-cta inline-flex items-center justify-center rounded-full bg-[#ff6600] px-8 py-3 text-base font-semibold text-white shadow-[var(--shadow-sm)]">
                  Create your Kard
                </Link>
                <Link href="/demo" className="inline-flex items-center justify-center rounded-full border border-white/35 px-6 py-3 text-base font-medium text-white">
                  View demo
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[430px]">
              <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full border border-[#aa8855]/40" />
              <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full border border-[#5c2999]/35" />
              <div className="spotlight-card inview-pop relative rounded-[24px] bg-[#f6f3ee] p-5 text-black shadow-[rgba(0,0,0,0.5)_0px_16px_32px_0px] overflow-hidden">
                <Spotlight
                  className="from-orange-500/10 via-orange-600/5 to-transparent blur-2xl"
                  size={140}
                />
                <KardDemoCarousel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-[#f6f3ee]">
        <div className="max-w-6xl mx-auto">
          <p className="mb-10 text-center text-xs font-semibold tracking-widest uppercase text-orange-500">How it works</p>
          <InView
            viewOptions={{ once: true, margin: "0px 0px -150px 0px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            <div className="pop-grid grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((item) => (
                <motion.div
                  key={item.step}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 30, filter: "blur(8px)" },
                    visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="spotlight-card rounded-2xl border border-gray-100 p-8 flex flex-col gap-3 shadow-[var(--shadow-xl)] hover:scale-[1.02] transition-transform duration-200"
                >
                  <p className="text-orange-500 text-sm font-bold">{item.step}</p>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </InView>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="accent-bar w-7 h-[3px] bg-[#ff6600] rounded-sm mb-4" />
          <p className="mb-2 text-xs font-semibold tracking-widest uppercase text-orange-500">Everything you need</p>
          <h2 className="max-w-2xl text-3xl md:text-4xl font-bold tracking-tight leading-tight text-black mb-3">
            A polished identity surface<br />that stays <span className="text-[#ff6600]">yours.</span>
          </h2>
          <p className="text-base md:text-lg text-gray-500 mb-10 max-w-xl">
            One card. One link. Every context — from a first handshake to a portfolio share. Always up to date, never out of print.
          </p>
          <InView
            viewOptions={{ once: true, margin: "0px 0px -150px 0px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
            }}
          >
            <div className="pop-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={{
                    hidden: { opacity: 0, scale: 0.92, y: 25, filter: "blur(6px)" },
                    visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`${feature.tone} feature-reveal-card spotlight-card kard-arc rounded-2xl p-6 flex flex-col gap-3 min-h-[180px] border border-[#e5e5e5] relative overflow-hidden hover:scale-[1.02] transition-transform duration-200`}
                >
                  <Spotlight
                    className="from-orange-500/10 via-orange-600/5 to-transparent blur-xl"
                    size={120}
                  />
                  <div className="feature-icon flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#888] shadow-[var(--shadow-sm)] relative z-10">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-base relative z-10">{feature.title}</h3>
                  <div className="feature-text-block relative z-10 mt-auto">
                    <p className="feature-short text-sm leading-relaxed text-gray-500">{feature.short}</p>
                    <p className="feature-full text-sm leading-relaxed text-gray-500">{feature.full}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </InView>
          <div className="flex items-center gap-3 mt-10">
            <Link href="/auth/signin" className="glow-cta inline-flex items-center justify-center rounded-full bg-[#ff6600] px-7 py-3 text-sm font-medium text-white shadow-[var(--shadow-sm)]">
              Start free ↗
            </Link>
            <Link href="/demo" className="inline-flex items-center justify-center rounded-full border border-[#e5e5e5] px-6 py-3 text-sm font-medium text-[#666] hover:text-black transition-colors bg-transparent">
              See how it works
            </Link>
          </div>
          <p className="text-xs text-[#888] mt-3">No credit card required &nbsp;·&nbsp; Free tier includes 2 cards</p>
        </div>
      </section>

      {/* ── Masonry Showcase ── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-[#f6f3ee]">
        <div className="max-w-6xl mx-auto">
          <p className="mb-2 text-xs font-semibold tracking-widest uppercase text-orange-500">Kards in the wild</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-black mb-10">
            Real people. Real connections.
          </h2>
          <div style={{ height: "800px" }}>
            <Masonry
              items={masonryItems}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={1.05}
              blurToFocus={true}
              colorShiftOnHover={false}
            />
          </div>
        </div>
      </section>

      {/* ── Privacy ── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-black text-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-orange-500">Privacy first</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            We collect zero data about your viewers.
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-gray-400">
            No cookies. No tracking. No fingerprinting. When someone views your Kard, nothing is collected about them.
          </p>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="mb-10 text-center text-xs font-semibold tracking-widest uppercase text-orange-500">Pricing</p>
          <div className="mx-auto grid max-w-3xl gap-6 grid-cols-1 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-8 relative overflow-hidden hover:scale-[1.02] transition-transform duration-200">
              <Spotlight className="from-zinc-400/10 to-transparent blur-xl" size={150} />
              <p className="font-medium">Free</p>
              <p className="my-4 text-4xl font-black">Rs. 0</p>
              <div className="mb-8 space-y-2">
                {["1 Kard", "QR + short code", "LinkedIn verification", "3 card modes", "Save contact"].map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-[#555]">
                    <span className="h-2 w-2 rounded-full bg-[#00cc88]" />{f}
                  </div>
                ))}
              </div>
              <Link href="/auth/signin" className="block rounded-full border border-black px-5 py-3 text-center text-sm font-medium bg-white hover:bg-neutral-50 transition-colors">
                Get started free
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-black p-8 text-white hover:scale-[1.02] transition-transform duration-200">
              <div className="absolute inset-x-0 top-0 h-1 bg-[#ff6600]" />
              <Spotlight className="from-orange-500/15 via-orange-600/5 to-transparent blur-xl" size={150} />
              <p className="font-medium text-white/75">Pro</p>
              <p className="my-4 text-4xl font-black">Soon</p>
              <div className="mb-8 space-y-2">
                {["Everything in Free", "Multiple Kards", "Full analytics", "Custom themes", "Priority support"].map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-white/65">
                    <span className="h-2 w-2 rounded-full bg-[#ff6600]" />{f}
                  </div>
                ))}
              </div>
              <div className="rounded-full bg-white/10 px-5 py-3 text-center text-sm font-medium text-white">
                Coming soon
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 md:px-12 lg:px-24 py-24 bg-black text-white text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black">Ready to build your Kard?</h2>
          <p className="mt-4 text-gray-400">Takes 2 minutes. No credit card needed.</p>
          <Link href="/auth/signin" className="glow-cta mt-8 inline-flex rounded-full bg-orange-500 hover:bg-orange-600 px-8 py-3 text-base font-semibold text-white shadow-[var(--shadow-sm)]">
            Create your Kard
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 md:px-12 lg:px-24 py-8 bg-black text-white">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
          <KardLogo size="sm" isDark={false} muted />
          <div className="flex items-center gap-5 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <span>2025 Kard</span>
          </div>
        </div>
      </footer>

    </main>
  );
}