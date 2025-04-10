import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('kpk_token')?.value;
  const { pathname } = request.nextUrl;

  if (!token && pathname.startsWith('/dashboard/overview')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (token && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard/overview', request.url));
  }

  if (!token && pathname.startsWith('/list-a-vehicle')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/auth/:path*", "/dashboard/:path*", "/list-a-vehicle/:path*"],
  // 
};
