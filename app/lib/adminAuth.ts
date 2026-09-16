import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_SESSION_COOKIE = 'hei_admin_session';

/** Deterministic token derived from the admin password — never store the raw password in a cookie. */
function getExpectedToken(): string | null {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  if (!password) return null;
  return createHmac('sha256', password).update('hei-admin-session-v1').digest('hex');
}

export function verifyAdminPassword(password: string): string | null {
  const expected = getExpectedToken();
  if (!expected || password !== process.env.ADMIN_DASHBOARD_PASSWORD) return null;
  return expected;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = getExpectedToken();
  if (!expected) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return false;

  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);
  if (tokenBuffer.length !== expectedBuffer.length) return false;

  return timingSafeEqual(tokenBuffer, expectedBuffer);
}
