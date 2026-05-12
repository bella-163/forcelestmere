import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

async function isAuthed() {
  if (!ADMIN_PASSWORD) return false;
  const cookieStore = await cookies();
  return cookieStore.get("admin-token")?.value === ADMIN_PASSWORD;
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "未授權" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "no file" }, { status: 400 });

  const ext = path.extname(file.name).toLowerCase() || ".png";
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json({ error: "unsupported file type" }, { status: 400 });
  }

  const safeName = `upload_${Date.now()}${ext}`;
  const imageDir = path.join(process.cwd(), "public", "images");
  fs.mkdirSync(imageDir, { recursive: true });
  const destPath = path.join(imageDir, safeName);

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(destPath, buffer);

  return NextResponse.json({ url: `/images/${safeName}` });
}
