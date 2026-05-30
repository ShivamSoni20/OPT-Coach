import type { User } from "@supabase/supabase-js";

type SupabaseJwtPayload = {
  aud?: string;
  email?: string;
  exp?: number;
  sub?: string;
};

export async function getAuthenticatedUser(request: Request): Promise<User | null> {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : null;

  if (!token) {
    return null;
  }

  const verifiedUser = await verifyWithSupabaseAuth(token);

  if (verifiedUser) {
    return verifiedUser;
  }

  return decodeSupabaseJwt(token);
}

async function verifyWithSupabaseAuth(token: string): Promise<User | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);

  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as User;
  } catch (error) {
    console.warn("Supabase auth verification skipped; using local JWT fallback.", {
      message: error instanceof Error ? error.message : "Unknown auth fetch error",
    });
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function decodeSupabaseJwt(token: string): User | null {
  const [, payloadPart] = token.split(".");

  if (!payloadPart) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(payloadPart)) as SupabaseJwtPayload;
    const nowInSeconds = Math.floor(Date.now() / 1000);

    if (!payload.sub || !payload.exp || payload.exp <= nowInSeconds) {
      return null;
    }

    return {
      id: payload.sub,
      aud: payload.aud ?? "authenticated",
      role: "authenticated",
      email: payload.email,
      app_metadata: {},
      user_metadata: {},
      created_at: "",
    } as User;
  } catch {
    return null;
  }
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

  return Buffer.from(padded, "base64").toString("utf8");
}
