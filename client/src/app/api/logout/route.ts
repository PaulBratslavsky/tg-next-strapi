import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const hostname = new URL(request.url).hostname;
  const isLocalhost = hostname === "localhost";
  const domain = process.env.HOST ?? "localhost";

  // Create the redirect response
  const response = NextResponse.redirect(new URL("/", request.url));

  try {
    // Clear the JWT cookie
    response.cookies.set("jwt", "", {
      maxAge: 0,
      path: "/",
      domain: domain,
      httpOnly: true,
      secure: !isLocalhost,
      sameSite: "lax",
    });

    // Also clear user cookie if it exists
    response.cookies.set("user", "", {
      maxAge: 0,
      path: "/",
      domain: domain,
      httpOnly: false,
      secure: !isLocalhost,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

// Also support POST method
export async function POST(request: NextRequest) {
  return GET(request);
}
