"use client";
export const dynamic = "force-dynamic";
import { Suspense, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { KardLogo } from "@/components/kard/kard-logo";
import { cn } from "@/lib/cn";

type State = "idle" | "loading" | "sent" | "error";

const OAUTH = [
  { id: "linkedin", label: "Continue with LinkedIn" },
  { id: "github", label: "Continue with GitHub" },
  { id: "google", label: "Continue with Google" },
];

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState("loading");
    try {
      const res = await signIn("email", { email: email.trim(), callbackUrl, redirect: false });
      setState(res?.error ? "error" : "sent");
    } catch {
      setState("error");
    }
  };

  const handleOAuth = async (provider: string) => {
    setOauthLoading(provider);
    await signIn(provider, { callbackUrl });
  };

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-black">
      <div className="kard-container flex min-h-screen items-center justify-center py-10">
        <div className="grid w-full overflow-hidden rounded-[24px] bg-white shadow-[var(--shadow-xl)] md:grid-cols-[0.95fr_1.05fr]">
          <section className="kard-arc hidden bg-black p-10 text-white md:flex md:flex-col md:justify-between">
            <KardLogo size="md" isDark />
            <div>
              <p className="mb-5 text-sm text-white/55">Private, portable identity</p>
              <h1 className="max-w-md text-5xl font-medium leading-none">Your Kard follows every connection.</h1>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-white/60">
                Sign in to edit your card, update links, and keep every shared QR current.
              </p>
            </div>
            <Link href="/" className="text-sm text-white/60 hover:text-white">Back to home</Link>
          </section>

          <section className="px-6 py-10 sm:px-12 md:px-16">
            <div className="mb-10 flex items-center justify-between md:hidden">
              <KardLogo size="md" isDark={false} />
              <Link href="/" className="text-sm text-[#888]">Home</Link>
            </div>

            <div className="mx-auto max-w-[390px]">
              {state === "sent" ? (
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#ebfef6] text-[#00a66f]">
                    <svg width="24" height="24" viewBox="0 0 22 22" fill="none"><path d="M2 6l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="2" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </div>
                  <h1 className="mb-2 text-3xl font-medium">Check your email</h1>
                  <p className="mb-7 text-sm leading-relaxed text-[#666]">We sent a magic link to<br /><span className="font-medium text-black">{email}</span></p>
                  <button onClick={() => setState("idle")} className="rounded-[24px] border border-black px-5 py-2.5 text-sm font-medium">Try a different email</button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <p className="mb-3 text-sm text-[#888]">Welcome back</p>
                    <h1 className="text-4xl font-medium leading-tight">Sign in to Kard</h1>
                    <p className="mt-3 text-base text-[#666]">Enter your email for a magic link.</p>
                  </div>
                  <form onSubmit={handleEmail} className="mb-6">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoFocus
                      className={cn("mb-3 w-full rounded-[18px] border bg-white px-4 py-3.5 text-sm text-black outline-none placeholder:text-[#aaa] transition-colors",
                        state === "error" ? "border-red-400" : "border-[#e5e5e5] focus:border-black")}
                    />
                    {state === "error" && <p className="mb-3 text-xs text-red-500">Something went wrong. Please try again.</p>}
                    <button type="submit" disabled={state === "loading" || !email.trim()} className="w-full rounded-[24px] bg-[#ff6600] py-3.5 text-sm font-medium text-white shadow-[var(--shadow-sm)] transition-colors disabled:opacity-50">
                      {state === "loading" ? "Sending..." : "Continue with email"}
                    </button>
                  </form>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#e5e5e5]" /><span className="text-xs text-[#888]">or</span><div className="h-px flex-1 bg-[#e5e5e5]" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {OAUTH.map((p) => (
                      <button key={p.id} onClick={() => handleOAuth(p.id)} disabled={oauthLoading !== null} className="w-full rounded-[18px] border border-black bg-white py-3 text-sm font-medium text-black transition-all hover:bg-[#f6f3ee] disabled:opacity-50">
                        {oauthLoading === p.id ? "Connecting..." : p.label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-7 text-center text-xs leading-relaxed text-[#888]">
                    By continuing you agree to our <Link href="/terms" className="text-black">Terms</Link> and <Link href="/privacy" className="text-black">Privacy Policy</Link>.
                  </p>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInContent />
    </Suspense>
  );
}

