import type { Metadata } from "next";
import "./globals.css";
import { CursorGlow } from "@/components/CursorGlow";

export const metadata: Metadata = {
  title: "文靜之潭｜Minecraft RPG 伺服器攻略站",
  description: "文靜之潭玩家專用攻略站，收錄職業、裝備、怪物圖鑑與功能指令。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
