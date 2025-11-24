import { NextResponse } from "next/server";

const COOKIE = process.env.SESSION_COOKIE_NAME ?? "__session";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set(COOKIE, "", {
    maxAge: 0,
    path: "/",
  });

  return res;
}