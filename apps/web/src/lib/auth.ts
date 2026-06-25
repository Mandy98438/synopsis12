import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";
import { prisma } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";

const providers: NextAuthOptions["providers"] = [
  EmailProvider({
    from: process.env.RESEND_FROM_EMAIL,
    sendVerificationRequest: async ({ identifier, url }) => {
      await sendVerificationEmail({ to: identifier, url });
    },
  }),
];

if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  providers.push(
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      authorization: {
        params: { scope: "openid profile email" },
      },
    }),
  );
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  );
}

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

if (process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET) {
  providers.push(
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify",
    error: "/auth/error",
    newUser: "/onboarding",
  },
  providers,
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.plan = (user as any).plan ?? "FREE";
      }
      if (account?.provider && user?.id) {
        await updateVerification(user.id, account.provider);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).plan = token.plan as string;
      }
      return session;
    },
    async signIn({ account }) {
      if (account?.provider === "email") {
        return true;
      }
      return true;
    },
  },
  events: {
    async createUser({ user }) {
      await prisma.verification.create({
        data: { userId: user.id!, level: 0 },
      });
    },
    async linkAccount({ user, account }) {
      await updateVerification(user.id!, account.provider);
    },
  },
};

async function updateVerification(userId: string, provider: string) {
  const update: Record<string, boolean> = {};

  if (provider === "linkedin") update.linkedinVerified = true;
  if (provider === "github") update.githubVerified = true;
  if (provider === "google") update.googleVerified = true;
  if (provider === "twitter") update.twitterVerified = true;

  if (Object.keys(update).length === 0) return;

  const verification = await prisma.verification.upsert({
    where: { userId },
    update,
    create: { userId, ...update },
  });

  const verified = [
    verification.linkedinVerified,
    verification.githubVerified,
    verification.googleVerified,
    verification.twitterVerified,
  ].filter(Boolean).length;

  const level = verified === 0 ? 0 : verified === 1 ? 1 : verified >= 2 ? (verification.linkedinVerified ? 3 : 2) : 1;

  await prisma.verification.update({
    where: { userId },
    data: { level },
  });
}
