import { getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "@/lib/get-token";

export type StrapiUserData = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  userProfile: {
    id: number,
    documentId: string,
  }
}

type GetUserMeLoaderResponse =
  | { ok: true; data: StrapiUserData; error: null }
  | { ok: false; data: null; error: unknown };

export async function getUserMeLoader(): Promise<GetUserMeLoaderResponse> {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/users/me", baseUrl);
  const authToken = await getAuthToken();

  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null, error: error };
  }
}

