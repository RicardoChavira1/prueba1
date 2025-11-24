import { adminAuth } from "@/lib/firebase-admin"; 
import { NextResponse } from "next/server";

const COOKIE = process.env.SESSION_COOKIE_NAME ?? "__session";
const MAX_AGE = Number(process.env.SESSION_COOKIE_MAX_AGE ?? 60 * 60 * 8);

export async function POST(req: Request) {
  console.log("🟢 INICIO  insano DE PETICIÓN A /api/sessionlogin");
  
  try {
    const body = await req.json();
    const { idToken, remember } = body;

    if (!idToken) {
      return NextResponse.json({ error: "falta idToken" }, { status: 400 });
    }

    const expiresIn = (remember ? MAX_AGE : 2 * 60 * 60) * 1000;

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    const res = NextResponse.json({ ok: true }, { status: 200 });

    res.cookies.set(COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: remember ? MAX_AGE : undefined,
    });

    return res;

  } catch (error: any) {
    console.error("🔥 ERROR CRÍTICO: esto va a explotar", error.message);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 401 }
    );
  }
}