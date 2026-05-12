import Link from "next/link";
import { navItems } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div>
            <p className="text-xl font-black tracking-[0.16em] text-white">文靜之潭</p>
            <p className="text-xs tracking-[0.22em] text-white/55">Minecraft RPG Server</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-white/75 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-cele-teal"
            >
              {item.label}
            </Link>
          ))}
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
