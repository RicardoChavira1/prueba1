import { NextResponse } from "next/server";

// Obtenemos el nombre de la cookie (o usamos el default de Firebase)
const COOKIE = process.env.SESSION_COOKIE_NAME ?? "__session";

export async function POST() {
  // 1. Preparamos una respuesta exitosa
  const res = NextResponse.json({ ok: true }, { status: 200 });

  // 2. Destruimos la cookie
  // Establecemos valor vacío y maxAge: 0 para que el navegador la borre inmediatamente
  res.cookies.set(COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, 
  });

  return res;
}