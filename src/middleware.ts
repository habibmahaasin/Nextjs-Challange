import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const protectedRoutes = ["/", "/posts", "/posts/:path*"];
export const publicRoutes = ["/login"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const currentPath = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    new RegExp(
      `^${route.replace(/:\w+\*/g, ".*").replace(/:\w+/g, "[^/]+")}$`
    ).test(currentPath)
  );

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && publicRoutes.includes(currentPath)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/posts", "/posts/:path*"],
};
