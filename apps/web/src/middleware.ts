import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const arcjetKey = process.env.ARCJET_KEY;
const arcjetEnabled = Boolean(arcjetKey && !arcjetKey.includes("placeholder"));

const aj = arcjetEnabled
  ? arcjet({
      key: arcjetKey!,
      rules: [
        shield({ mode: "LIVE" }),
      ],
    })
  : null;

const apiLimiter = arcjetEnabled
  ? arcjet({
      key: arcjetKey!,
      characteristics: ["userId"],
      rules: [
        shield({ mode: "LIVE" }),
        tokenBucket({
          mode: "LIVE",
          refillRate: 20,
          interval: 60,
          capacity: 40,
        }),
      ],
    })
  : null;

const cardCreateLimiter = arcjetEnabled
  ? arcjet({
      key: arcjetKey!,
      characteristics: ["userId"],
      rules: [
        shield({ mode: "LIVE" }),
        tokenBucket({
          mode: "LIVE",
          refillRate: 3,
          interval: 3600,
          capacity: 3,
        }),
      ],
    })
  : null;

const viewerLimiter = arcjetEnabled
  ? arcjet({
      key: arcjetKey!,
      characteristics: ["ip.src"],
      rules: [
        shield({ mode: "LIVE" }),
        detectBot({
          mode: "LIVE",
          allow: ["CATEGORY:SEARCH_ENGINE"],
        }),
        tokenBucket({
          mode: "LIVE",
          refillRate: 60,
          interval: 60,
          capacity: 120,
        }),
      ],
    })
  : null;

const authLimiter = arcjetEnabled
  ? arcjet({
      key: arcjetKey!,
      characteristics: ["ip.src"],
      rules: [
        shield({ mode: "LIVE" }),
        tokenBucket({
          mode: "LIVE",
          refillRate: 5,
          interval: 60,
          capacity: 10,
        }),
      ],
    })
  : null;

export async function middleware(request: NextRequest) {
  if (!aj || !apiLimiter || !cardCreateLimiter || !viewerLimiter || !authLimiter) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  let decision;

  if (pathname.startsWith("/api/auth")) {
    decision = await (authLimiter as any).protect(request);
  } else if (pathname.startsWith("/api/trpc/kard.create")) {
    decision = await (cardCreateLimiter as any).protect(request);
  } else if (pathname.startsWith("/api/trpc/kard.getByUsername") || pathname.startsWith("/api/qr")) {
    decision = await (viewerLimiter as any).protect(request);
  } else if (pathname.startsWith("/api")) {
    decision = await (apiLimiter as any).protect(request);
  } else {
    decision = await aj.protect(request);
  }

  if (decision && decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { success: false, error: { code: "RATE_LIMITED", message: "Too many requests" } },
        { status: 429 },
      );
    }
    if (decision.reason.isBot()) {
      return NextResponse.json(
        { success: false, error: { code: "BOT_DETECTED", message: "Automated requests not allowed" } },
        { status: 403 },
      );
    }
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Request blocked" } },
      { status: 403 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
