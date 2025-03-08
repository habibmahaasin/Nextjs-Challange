import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const protectedRoutes = ["/"];
export const publicRoutes = ["/login"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const currentPath = req.nextUrl.pathname;

  if (!token && protectedRoutes.includes(currentPath)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && publicRoutes.includes(currentPath)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
