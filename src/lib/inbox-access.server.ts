import {
  getCookie,
  getRequestProtocol,
  setCookie,
} from "@tanstack/react-start/server";
import { codesMatch, issueInboxToken, readInboxToken } from "@/lib/inbox-token";

const COOKIE = "ellie_studio";
const TTL_SECONDS = 12 * 60 * 60;

function cookieBase() {
  let secure = false;
  try {
    secure = getRequestProtocol() === "https";
  } catch {
    secure = process.env.NODE_ENV === "production";
  }

  return {
    path: "/",
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
  };
}

export function grantInboxAccess(code: string): boolean {
  if (!codesMatch(code)) return false;
  const token = issueInboxToken();
  setCookie(COOKIE, token, { ...cookieBase(), maxAge: TTL_SECONDS });
  return true;
}

export function hasInboxAccess(): boolean {
  return readInboxToken(getCookie(COOKIE));
}

export function assertInboxAccess(): void {
  if (!hasInboxAccess()) throw new Error("Unauthorized");
}

export function clearInboxAccess(): void {
  setCookie(COOKIE, "", { ...cookieBase(), maxAge: 0 });
}
