import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { readData } from "@/lib/data";
import type { EquipmentData } from "@/types/site";

const rarityColor: Record<string, string> = {
  "傳說": "text-cele-gold",
  "史詩": "text-cele-violet",
  "稀有": "text-cele-blue",
  "普通": "text-slate-400",
};

const colorStyles: Record<string, { card: string; arrow: string }> = {
  teal:   { card: "border-cele-teal/40 bg-white/70 hover:border-cele-teal/70",   arrow: "text-cele-teal" },
  blue:   { card: "border-cele-blue/40 bg-white/70 hover:border-cele-blue/70",   arrow: "text-cele-blue" },
  gold:   { card: "border-cele-gold/40 bg-white/70 hover:border-cele-gold/70",   arrow: "text-cele-gold" },
  violet: { card: "border-cele-violet/40 bg-white/70 hover:border-cele-violet/70", arrow: "text-cele-violet" },
  green:  { card: "border-emerald-500/40 bg-white/70 hover:border-emerald-400/70", arrow: "text-emerald-600" },
  crimson:{ card: "border-red-500/40 bg-white/70 hover:border-red-400/70",       arrow: "text-red-500" },
  gray:   { card: "border-slate-400/40 bg-white/70 hover:border-slate-400/70",   arrow: "text-slate-500" },
};

export default function EquipmentPage() {
  const equipment = readData<EquipmentData[]>("equipment");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <p className="text-sm font-black tracking-[0.22em] text-cele-teal">文靜之潭資料庫</p>
        <h1 className="mt-4 text-5xl font-black text-slate-900">裝備介紹</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">伺服器內各類裝備的屬性與取得方式。</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((eq) => {
            const s = colorStyles[eq.color] ?? colorStyles.teal;
            return (
              <Link
                key={eq.slug}
                href={`/equipment/${eq.slug}`}
                className={`group rounded-2xl border p-5 backdrop-blur transition hover:-translate-y-1 ${s.card}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{eq.type}</span>
                  <span className={`text-xs font-black ${rarityColor[eq.rarity] ?? "text-slate-400"}`}>{eq.rarity}</span>
                </div>
                <h2 className="mt-2 text-xl font-black text-slate-900">{eq.name}</h2>
                <p className="mt-1 text-xs text-slate-400">來源：{eq.source}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{eq.effect}</p>
                <div className={`mt-4 flex items-center gap-1 text-sm font-bold ${s.arrow}`}>
                  查看詳情 <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
