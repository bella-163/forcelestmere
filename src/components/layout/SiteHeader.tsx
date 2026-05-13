"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems } from "@/data/site";

const GUIDES_CHILDREN = [
  { label: "職業介紹", href: "/classes" },
  { label: "怪物圖鑑", href: "/monsters" },
  { label: "副本攻略", href: "/dungeons" },
  { label: "活動攻略", href: "/events" },
];

export function SiteHeader() {
  const [guidesOpen, setGuidesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-blue-900/40 bg-[#0d2137]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div>
            <p className="text-xl font-black tracking-[0.16em] text-white">文靜之潭</p>
            <p className="text-xs tracking-[0.22em] text-white/55">Minecraft RPG Server</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-white/75 lg:flex">
          {navItems.map((item) => {
            if (item.href === "/guides") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setGuidesOpen(true)}
                  onMouseLeave={() => setGuidesOpen(false)}
                >
                  <Link href="/guides" className="transition hover:text-cele-teal">
                    {item.label}
                  </Link>

                  {guidesOpen && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                      <div className="min-w-[140px] overflow-hidden rounded-xl border border-blue-900/60 bg-[#0d2137] shadow-lg">
                        {GUIDES_CHILDREN.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-cele-teal"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return item.href.startsWith("http") ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-cele-teal"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-cele-teal"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/commands"
          className="hidden rounded-lg border border-cele-teal/50 bg-cele-teal/15 px-4 py-2 text-sm font-bold text-white transition hover:bg-cele-teal/25 md:inline-flex"
        >
          快速開始
        </Link>
      </div>
    </header>
  );
}
