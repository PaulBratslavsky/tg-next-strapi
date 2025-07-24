import { NextResponse } from "next/server";

import { getStrapiURL } from "@/lib/utils";

export async function GET(request: Request, { params }: { params: Promise<{ [key: string]: string }> }) {
  const resolvedParams = await params;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("access_token");
  const provider = resolvedParams.provider;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const backendUrl = getStrapiURL();
  const path = `/api/auth/${provider}/callback`;
  const url = new URL(backendUrl + path);
  url.searchParams.append("access_token", token);

  try {
    const res = await fetch(url.href);
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!data.jwt) {
      return NextResponse.redirect(new URL("/", request.url));
    }


    const requestUrl = new URL(request.url);
    const hostname = requestUrl.hostname;
    const isLocalhost = hostname === "localhost";

    const response = NextResponse.redirect(new URL("/", request.url));

    response.cookies.set("jwt", data.jwt, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      domain: process.env.HOST ?? "localhost",
      httpOnly: true,
      secure: !isLocalhost,
      sameSite: "lax",
    });

    return response;
  } catch (error) {

    return NextResponse.redirect(new URL("/", request.url));
  }
}