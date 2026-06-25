import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DashboardShell } from "@/components/dashboard/shell";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/signin");
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, include: { verification: true } });
  if (!user) redirect("/auth/signin");
  return (
    <DashboardShell user={{ name: user.name, email: user.email, plan: user.plan }}>
      <div className="flex-1 p-6 md:p-8 max-w-2xl">
        <p className="mb-2 text-sm text-[#888]">Workspace</p>
        <h1 className="text-3xl font-medium text-black mb-8">Settings</h1>
        <div className="space-y-4">
          <div className="bg-white border border-[#e5e5e5] rounded-[24px] p-6 shadow-[var(--shadow-sm)]">
            <p className="text-[11px] text-[#888] uppercase font-medium mb-3">Account</p>
            <p className="text-sm text-black">{user.email}</p>
            <p className="text-xs text-[#888] mt-1">Plan: <span className="text-black capitalize">{user.plan.toLowerCase()}</span></p>
          </div>
          <div className="bg-[#f6f1fe] border border-[#e5e5e5] rounded-[24px] p-6">
            <p className="text-[11px] text-[#5c2999] uppercase font-medium mb-3">Verification</p>
            <p className="text-sm text-black">Level {user.verification?.level ?? 0}</p>
            <div className="mt-3 space-y-1.5">
              {[["LinkedIn", user.verification?.linkedinVerified], ["GitHub", user.verification?.githubVerified], ["Google", user.verification?.googleVerified]].map(([name, verified]) => (
                <div key={String(name)} className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${verified ? "bg-[#00cc88]" : "bg-[#aaa]"}`} />
                  <span className="text-xs text-[#555]">{String(name)}</span>
                  <span className={`text-[10px] ${verified ? "text-[#00885a]" : "text-[#888]"}`}>{verified ? "Verified" : "Not connected"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
