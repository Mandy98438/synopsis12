"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

// ─── Kard Nav Config ─────────────────────────────────────────────────────────

const KARD_NAV_ITEMS: CardNavItem[] = [
  {
    label: "Product",
    bgColor: "#1a1a1a",
    textColor: "#fff",
    links: [
      { label: "Demo",         href: "/demo",          ariaLabel: "View Kard demo" },
      { label: "How it works", href: "/#how-it-works", ariaLabel: "How Kard works" },
      { label: "Card modes",   href: "/#features",     ariaLabel: "Card modes" },
    ],
  },
  {
    label: "Company",
    bgColor: "#1f1f1f",
    textColor: "#fff",
    links: [
      { label: "Privacy", href: "/privacy", ariaLabel: "Privacy policy" },
      { label: "Terms",   href: "/terms",   ariaLabel: "Terms of service" },
    ],
  },
  {
    label: "Connect",
    bgColor: "#1a1a1a",
    textColor: "#fff",
    links: [
      { label: "Sign in",     href: "/sign-in", ariaLabel: "Sign in to Kard" },
      { label: "Get started", href: "/sign-up", ariaLabel: "Create your Kard" },
    ],
  },
];

// ─── Arrow Icon ───────────────────────────────────────────────────────────────

function ArrowUpRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

// ─── Kard Logo ────────────────────────────────────────────────────────────────

function KardLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-black no-underline">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <polygon points="10,2 18,17 2,17" fill="#F97316" />
      </svg>
      <span className="text-sm font-semibold tracking-widest uppercase">KARD</span>
    </Link>
  );
}

// ─── KardNav ─────────────────────────────────────────────────────────────────

export default function KardNav() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const prev = {
          visibility: contentEl.style.visibility,
          pointerEvents: contentEl.style.pointerEvents,
          position: contentEl.style.position,
          height: contentEl.style.height,
        };
        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";
        contentEl.offsetHeight;
        const h = 60 + contentEl.scrollHeight + 16;
        Object.assign(contentEl.style, prev);
        return h;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease: "power3.out" });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.08 }, "-=0.1");
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => { tl?.kill(); tlRef.current = null; };
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        gsap.set(navRef.current, { height: calculateHeight() });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) { newTl.progress(1); tlRef.current = newTl; }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className="card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[860px] z-[99] top-[1.2em] md:top-[2em]">
      <nav
        ref={navRef}
        className="block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height] bg-white"
      >
        {/* ── Top Bar ── */}
        <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 z-[2]">

          {/* Hamburger — visible on mobile */}
          <div
            className="group flex flex-col justify-center gap-[6px] cursor-pointer order-2 md:order-none h-full md:hidden"
            onClick={toggleMenu}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMenu();
              }
            }}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            aria-expanded={isExpanded}
            tabIndex={0}
          >
            <div className={`w-[26px] h-[2px] bg-black transition-transform duration-300 origin-center ${isHamburgerOpen ? "translate-y-[4px] rotate-45" : ""} group-hover:opacity-70`} />
            <div className={`w-[26px] h-[2px] bg-black transition-transform duration-300 origin-center ${isHamburgerOpen ? "-translate-y-[4px] -rotate-45" : ""} group-hover:opacity-70`} />
          </div>

          {/* Hamburger — also on desktop to open the card drawer */}
          <div
            className="hidden md:flex flex-col justify-center gap-[6px] cursor-pointer h-full group"
            onClick={toggleMenu}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMenu();
              }
            }}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            aria-expanded={isExpanded}
            tabIndex={0}
          >
            <div className={`w-[26px] h-[2px] bg-black transition-transform duration-300 origin-center ${isHamburgerOpen ? "translate-y-[4px] rotate-45" : ""} group-hover:opacity-70`} />
            <div className={`w-[26px] h-[2px] bg-black transition-transform duration-300 origin-center ${isHamburgerOpen ? "-translate-y-[4px] -rotate-45" : ""} group-hover:opacity-70`} />
          </div>

          {/* Logo — centered */}
          <div className="flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <KardLogo />
          </div>

          {/* CTA buttons — desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/sign-in"
              className="px-4 py-1.5 text-sm font-medium border border-black rounded-full text-black no-underline hover:bg-black hover:text-white transition-colors duration-200"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-1.5 text-sm font-semibold rounded-full text-white no-underline hover:opacity-90 transition-opacity duration-200"
              style={{ backgroundColor: "#F97316" }}
            >
              Get started
            </Link>
          </div>
        </div>

        {/* ── Dropdown Cards ── */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col md:flex-row items-stretch md:items-end gap-2 md:gap-3 z-[1] ${
            isExpanded ? "visible pointer-events-auto" : "invisible pointer-events-none"
          }`}
          aria-hidden={!isExpanded}
        >
          {KARD_NAV_ITEMS.map((item, idx) => (
            <div
              key={item.label}
              ref={setCardRef(idx)}
              className="relative flex flex-col gap-2 p-3 rounded-[calc(0.75rem-0.2rem)] flex-1 min-h-[60px] md:h-full"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              {/* Orange accent bar */}
              <div className="w-5 h-[3px] rounded-full" style={{ backgroundColor: "#F97316" }} />

              <div className="text-[18px] md:text-[20px] font-medium tracking-tight">
                {item.label}
              </div>

              <div className="mt-auto flex flex-col gap-1">
                {item.links.map((lnk) => (
                  <Link
                    key={lnk.label}
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    className="inline-flex items-center gap-1.5 text-[14px] md:text-[15px] no-underline opacity-60 hover:opacity-100 transition-opacity duration-200"
                    style={{ color: item.textColor }}
                    onClick={toggleMenu}
                  >
                    <ArrowUpRight />
                    {lnk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
