import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Site-wide HTTP Basic Auth gate, active only while SITE_PASSWORD is set.
 * Set SITE_PASSWORD (and optionally SITE_USERNAME) as a Vercel env var to
 * lock the site down while it's still in progress; remove it to go public.
 */
export function proxy(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return NextResponse.next();

  const username = process.env.SITE_USERNAME || "veyra";
  const auth = request.headers.get("authorization");

  if (auth?.startsWith("Basic ")) {
    const decoded = Buffer.from(auth.slice(6), "base64").toString("utf-8");
    const separatorIndex = decoded.indexOf(":");
    const user = decoded.slice(0, separatorIndex);
    const pass = decoded.slice(separatorIndex + 1);
    if (user === username && pass === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="VEYRA ESTATE preview"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon|robots.txt|sitemap.xml).*)"],
};
