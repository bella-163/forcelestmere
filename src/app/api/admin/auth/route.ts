import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function GET() {
  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ authed: false }, { status: 200 });
  }

  const cookieStore = await cookies();
  const authed = cookieStore.get("admin-token")?.value === ADMIN_PASSWORD;

  return NextResponse.json({ authed });
}
