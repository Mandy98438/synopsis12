"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { KardLogo } from "@/components/kard/kard-logo";
import { cn } from "@/lib/cn";

interface DashboardShellProps {
  children: React.ReactNode;
  user: { name?: string | null; email?: string | null; plan?: string };
}

const NAV = [
  { href: "/dashboard", label: "My Kard" },
  { href: "/dashboard/new", label: "New Card" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function DashboardShell({ children, user }: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const initials = user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f3ee] text-black">
      <aside className="hidden w-[232px] flex-shrink-0 flex-col border-r border-[#e5e5e5] bg-white md:flex">
        <div className="border-b border-[#e5e5e5] px-6 py-5">
          <KardLogo size="md" isDark={false} />
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3 py-5">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("rounded-[16px] px-4 py-3 text-sm font-medium transition-all",
                  active ? "bg-black text-white" : "text-[#666] hover:bg-[#f6f3ee] hover:text-black")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-[#e5e5e5] px-4 py-5">
          <div className="mb-2 flex items-center gap-3 rounded-[18px] bg-[#f6f3ee] p-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-black text-xs font-medium text-white">{initials}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.name ?? user.email?.split("@")[0]}</p>
              <p className="text-xs capitalize text-[#888]">{(user.plan ?? "free").toLowerCase()} plan</p>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full rounded-[16px] px-4 py-2.5 text-left text-sm text-[#888] hover:bg-[#f6f3ee] hover:text-black">
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex flex-shrink-0 items-center justify-between border-b border-[#e5e5e5] bg-white px-4 py-3 md:hidden">
          <KardLogo size="sm" isDark={false} />
          <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="rounded-lg border border-black px-3 py-1.5 text-sm font-medium">
            {mobileNavOpen ? "Close" : "Menu"}
          </button>
        </div>

        {mobileNavOpen && (
          <div className="absolute inset-0 z-50 flex flex-col bg-white pt-16 md:hidden">
            <nav className="flex flex-col gap-1 px-4 py-4">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileNavOpen(false)} className={cn("rounded-[18px] px-4 py-3.5 text-sm font-medium",
                    active ? "bg-black text-white" : "text-[#666]")}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto border-t border-[#e5e5e5] px-4 py-6">
              <p className="mb-3 text-sm text-[#666]">{user.email}</p>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm text-red-600">Sign out</button>
            </div>
          </div>
        )}

        <main className="min-h-0 flex-1 overflow-auto">{children}</main>

        <div className="flex flex-shrink-0 border-t border-[#e5e5e5] bg-white md:hidden">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn("flex-1 py-3 text-center text-xs font-medium",
                active ? "text-[#ff6600]" : "text-[#888]")}>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

