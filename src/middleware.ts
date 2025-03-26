import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthRoute = pathname.startsWith("/auth");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  
  const token = request.cookies.get("kpk_token")?.value;

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard/overview", request.url));
  }

  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/auth/:path*", "/dashboard/:path*"],
};


