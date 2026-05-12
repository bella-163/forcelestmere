import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { readData } from "@/lib/data";
import type { EquipmentData } from "@/types/site";

const rarityColor: Record<string, string> = {
  "傳說": "text-cele-gold",
  "史詩": "text-cele-violet",
  "稀有": "text-cele-blue",
  "普通": "text-white/50",
};

const colorStyles: Record<string, { card: string; arrow: string }> = {
  teal:   { card: "border-cele-teal/35 bg-cele-teal/5 hover:border-cele-teal/60",   arrow: "text-cele-teal" },
  blue:   { card: "border-cele-blue/35 bg-cele-blue/5 hover:border-cele-blue/60",   arrow: "text-cele-blue" },
  gold:   { card: "border-cele-gold/35 bg-cele-gold/5 hover:border-cele-gold/60",   arrow: "text-cele-gold" },
  violet: { card: "border-cele-violet/35 bg-cele-violet/5 hover:border-cele-violet/60", arrow: "text-cele-violet" },
  green:  { card: "border-emerald-500/35 bg-emerald-500/5 hover:border-emerald-400/60", arrow: "text-emerald-400" },
  crimson:{ card: "border-red-500/35 bg-red-500/5 hover:border-red-400/60",         arrow: "text-red-400" },
  gray:   { card: "border-slate-500/35 bg-slate-500/5 hover:border-slate-400/60",   arrow: "text-slate-300" },
};

export default function EquipmentPage() {
  const equipment = readData<EquipmentData[]>("equipment");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <p className="text-sm font-black tracking-[0.22em] text-cele-teal">文靜之潭資料庫</p>
        <h1 className="mt-4 text-5xl font-black text-white">裝備介紹</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">伺服器內各類裝備的屬性與取得方式。</p>

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
                  <span className="text-xs text-white/45">{eq.type}</span>
                  <span className={`text-xs font-black ${rarityColor[eq.rarity] ?? "text-white/50"}`}>{eq.rarity}</span>
                </div>
                <h2 className="mt-2 text-xl font-black text-white">{eq.name}</h2>
                <p className="mt-1 text-xs text-white/45">來源：{eq.source}</p>
                <p className="mt-3 text-sm leading-6 text-white/65">{eq.effect}</p>
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
