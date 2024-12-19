import refreshToken from "@/actions/auth";
import { getSession } from "./session";

export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export default async function authFetch(
  url: string | URL,
  options: FetchOptions = {}
) {
  const session = await getSession();

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session?.accessToken}`,
  };

  let res = await fetch(url, options);

  // Handle the response (e.g., check for token expiration)
  if (res.status === 401) {
    // Handle token expiration (e.g., redirect to sign-in page or refresh token)

    if (!session?.refreshToken)
      throw new Error("Refresh token not found in auth fetch");
    const newAccessToken = await refreshToken(session.refreshToken);
    if (newAccessToken) {
      options.headers.Authorization = `Bearer ${newAccessToken}`;
      res = await fetch(url, options);
      return res;
    }
  }
}
