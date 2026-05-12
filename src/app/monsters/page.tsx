import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { readData } from "@/lib/data";
import type { MonsterData } from "@/types/site";

const colorStyles: Record<string, { card: string; badge: string }> = {
  teal:   { card: "border-cele-teal/35 bg-cele-teal/5 hover:border-cele-teal/60",   badge: "bg-cele-teal/20 text-cele-teal" },
  blue:   { card: "border-cele-blue/35 bg-cele-blue/5 hover:border-cele-blue/60",   badge: "bg-cele-blue/20 text-cele-blue" },
  gold:   { card: "border-cele-gold/35 bg-cele-gold/5 hover:border-cele-gold/60",   badge: "bg-cele-gold/20 text-cele-gold" },
  violet: { card: "border-cele-violet/35 bg-cele-violet/5 hover:border-cele-violet/60", badge: "bg-cele-violet/20 text-cele-violet" },
  green:  { card: "border-emerald-500/35 bg-emerald-500/5 hover:border-emerald-400/60", badge: "bg-emerald-500/20 text-emerald-400" },
  crimson:{ card: "border-red-500/35 bg-red-500/5 hover:border-red-400/60",         badge: "bg-red-500/20 text-red-400" },
  gray:   { card: "border-slate-500/35 bg-slate-500/5 hover:border-slate-400/60",   badge: "bg-slate-500/20 text-slate-300" },
};

export default function MonstersPage() {
  const monsters = readData<MonsterData[]>("monsters");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <p className="text-sm font-black tracking-[0.22em] text-cele-teal">文靜之潭資料庫</p>
        <h1 className="mt-4 text-5xl font-black text-white">怪物圖鑑</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">各怪物的等級、弱點與掉落物品。</p>

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
                  <span className="text-xs text-white/40">弱點：{m.weakness}</span>
                </div>
                <h2 className="mt-3 text-xl font-black text-white">{m.name}</h2>
                <p className="mt-2 text-sm leading-6 text-white/65">{m.description}</p>
                {m.drops.length > 0 && (
                  <p className="mt-3 text-xs text-white/40">掉落：{m.drops.join("、")}</p>
                )}
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
