import { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isSignInPage = request.nextUrl.pathname === "/sign-in";

  if (session && isSignInPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session && !isSignInPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in"],
};