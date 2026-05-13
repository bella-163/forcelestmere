import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { readData } from "@/lib/data";
import type { MonsterData } from "@/types/site";

const colorStyles: Record<string, { card: string; badge: string }> = {
  teal:   { card: "border-cele-teal/40 bg-white/70 hover:border-cele-teal/70",   badge: "bg-teal-100 text-teal-700" },
  blue:   { card: "border-cele-blue/40 bg-white/70 hover:border-cele-blue/70",   badge: "bg-blue-100 text-blue-700" },
  gold:   { card: "border-cele-gold/40 bg-white/70 hover:border-cele-gold/70",   badge: "bg-amber-100 text-amber-700" },
  violet: { card: "border-cele-violet/40 bg-white/70 hover:border-cele-violet/70", badge: "bg-violet-100 text-violet-700" },
  green:  { card: "border-emerald-500/40 bg-white/70 hover:border-emerald-400/70", badge: "bg-emerald-100 text-emerald-700" },
  crimson:{ card: "border-red-500/40 bg-white/70 hover:border-red-400/70",       badge: "bg-red-100 text-red-600" },
  gray:   { card: "border-slate-400/40 bg-white/70 hover:border-slate-400/70",   badge: "bg-slate-100 text-slate-600" },
};

export default function MonstersPage() {
  const monsters = readData<MonsterData[]>("monsters");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <p className="text-sm font-black tracking-[0.22em] text-cele-teal">文靜之潭資料庫</p>
        <h1 className="mt-4 text-5xl font-black text-slate-900">怪物圖鑑</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">各怪物的等級、弱點與掉落物品。</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {monsters.map((m) => {
            const s = colorStyles[m.color] ?? colorStyles.teal;
            return (
              <Link
                key={m.slug}
                href={`/monsters/${m.slug}`}
                className={`group rounded-2xl border p-5 backdrop-blur transition hover:-translate-y-1 ${s.card}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-black ${s.badge}`}>{m.level}</span>
                  <span className="text-xs text-slate-400">弱點：{m.weakness}</span>
                </div>
                <h2 className="mt-3 text-xl font-black text-slate-900">{m.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{m.description}</p>
                {m.drops.length > 0 && (
                  <p className="mt-3 text-xs text-slate-400">掉落：{m.drops.join("、")}</p>
                )}
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
