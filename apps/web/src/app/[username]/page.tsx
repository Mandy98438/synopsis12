import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateCardMetadata } from "@/lib/metadata";
import { getDemoKard, isDemoUsername } from "@/lib/demo-kard";
import { KardCard } from "@/components/kard/kard-card";

interface Props { params: { username: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateCardMetadata(params.username);
}

async function getKard(username: string) {
  const normalized = username.toLowerCase();

  if (isDemoUsername(normalized)) {
    return getDemoKard();
  }

  const kard = await prisma.kard.findUnique({
    where: { username: normalized, active: true },
    include: {
      links: { orderBy: { order: "asc" } },
      user: { include: { verification: true } },
    },
  });

  if (!kard) return null;
  void incrementViewCount(kard.id).catch(() => {});
  return kard;
}

async function incrementViewCount(kardId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const analytics = await prisma.kardAnalytics.upsert({
    where: { kardId },
    update: { totalViews: { increment: 1 } },
    create: { kardId, totalViews: 1 },
  });

  await prisma.dailyView.upsert({
    where: {
      analyticsId_date: {
        analyticsId: analytics.id,
        date: today,
      },
    },
    update: { views: { increment: 1 } },
    create: {
      analyticsId: analytics.id,
      date: today,
      views: 1,
    },
  });
}

export default async function KardViewerPage({ params }: Props) {
  const kard = await getKard(params.username);
  if (!kard) notFound();

  // Check if session user is the owner
  const session = await getServerSession(authOptions);
  const isOwner = session?.user?.id === kard.user?.id;

  const socials = {
    linkedin: kard.links.find((l) => l.type.toLowerCase() === "linkedin")?.url,
    twitter: kard.links.find((l) => l.type.toLowerCase() === "twitter" || l.type.toLowerCase() === "x")?.url,
    github: kard.links.find((l) => l.type.toLowerCase() === "github")?.url,
  };

  return (
    <main className="page-reveal min-h-screen bg-[#f6f3ee] p-4 text-black">
      <div className="kard-container flex min-h-screen items-center justify-center py-10">
        <KardCard
          name={`${kard.firstName} ${kard.lastName}`}
          role={kard.headline}
          company={kard.company ?? ""}
          photoUrl={kard.avatarUrl ?? undefined}
          kardId={kard.username}
          socials={socials}
          showEdit={isOwner}
        />
      </div>
    </main>
  );
}

