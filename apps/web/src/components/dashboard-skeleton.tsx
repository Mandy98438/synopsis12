"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-[#e5e5e5]", className)} />;
}

export function KardCardSkeleton() {
  return (
    <div className="space-y-4 rounded-[24px] border border-[#e5e5e5] bg-white p-5">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-2.5 w-20" />
        </div>
        <Skeleton className="h-6 w-16 rounded-lg" />
      </div>
      <Skeleton className="h-px w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-7 flex-1 rounded-lg" />
        <Skeleton className="h-7 flex-1 rounded-lg" />
        <Skeleton className="h-7 w-7 rounded-lg" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="h-9 w-32 rounded-[24px]" />
      </div>
      <div className="mb-6 grid grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2 rounded-[24px] border border-[#e5e5e5] bg-white p-4">
            <Skeleton className="h-2.5 w-16" />
            <Skeleton className="h-6 w-12" />
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <KardCardSkeleton />
        <KardCardSkeleton />
      </div>
    </div>
  );
}

export function AnalyticsSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="mb-6 h-4 w-48" />
      <div className="rounded-[24px] border border-[#e5e5e5] bg-white p-5">
        <Skeleton className="mb-4 h-3 w-24" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2 rounded-[24px] border border-[#e5e5e5] bg-white p-4">
            <Skeleton className="h-2.5 w-20" />
            <Skeleton className="h-6 w-10" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[24px] border border-[#e5e5e5] bg-[#f6f3ee] text-2xl">
        {icon}
      </div>
      <p className="mb-1 text-sm font-medium text-black">{title}</p>
      <p className="mb-5 max-w-xs text-xs text-[#666]">{description}</p>
      {action}
    </div>
  );
}

export function NoKardsEmpty({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <EmptyState
      icon="✦"
      title="No Kards yet"
      description="Create your first digital identity card and start sharing it instantly."
      action={
        <button onClick={onCreateClick} className="rounded-[24px] bg-[#ff6600] px-4 py-2 text-xs font-medium text-white">
          Create your first Kard
        </button>
      }
    />
  );
}

export function NoAnalyticsEmpty() {
  return (
    <EmptyState
      icon="↗"
      title="No views yet"
      description="Share your Kard and analytics will appear here once people start viewing it."
    />
  );
}

export function NoLinksEmpty() {
  return (
    <div className="py-6 text-center">
      <p className="text-xs text-[#888]">No links added yet</p>
    </div>
  );
}

export function NoKardsEmptyServer() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="w-full max-w-sm rounded-[24px] bg-white p-8 shadow-[var(--shadow-xl)]">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[24px] border border-[#e5e5e5] bg-[#f6f3ee] text-2xl">
          ✦
        </div>
        <p className="mb-1 text-sm font-medium text-black">No Kards yet</p>
        <p className="mx-auto mb-5 max-w-xs text-xs text-[#666]">
          Create your first digital identity card and start sharing it instantly.
        </p>
        <Link href="/dashboard/new" className="rounded-[24px] bg-[#ff6600] px-4 py-2 text-xs font-medium text-white">
          Create your first Kard
        </Link>
      </div>
    </div>
  );
}

