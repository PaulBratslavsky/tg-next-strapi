import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getUserMeLoader } from "@/data/services/user";

// Define an array of protected routes
const protectedRoutes: string[] = ["/profile", "/profile/*"];

// Helper function to check if a path is protected
function isProtectedRoute(path: string): boolean {
  if (!path || protectedRoutes.length === 0) return false;
  return protectedRoutes.some((route) => {
    // For exact matches
    if (!route.includes("*")) {
      return path === route;
    }

    // For wildcard routes (e.g., /profile/*)
    const basePath = route.replace("/*", "");
    return path === basePath || path.startsWith(`${basePath}/`);
  });
}

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();

  console.log("************ middleware ************");
  console.dir(user, { depth: null });
  console.log("************************************");

  const currentPath = request.nextUrl.pathname;

  if (isProtectedRoute(currentPath) && user.ok === false) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure matcher for better performance
export const config = {
  matcher: [
    // Match /profile and any path under /profile
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/profile",
    "/profile/:path*",
  ],
};
