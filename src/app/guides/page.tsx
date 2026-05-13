import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";

const guides = [
  {
    href: "/classes",
    eyebrow: "CLASSES",
    title: "職業介紹",
    description: "六種職業各有特色，從坦克、輸出到治療，找到最適合你的玩法。",
    color: "border-cele-teal/40 bg-white/70 hover:border-cele-teal/70",
    eyebrowColor: "text-cele-teal",
  },
  {
    href: "/monsters",
    eyebrow: "MONSTERS",
    title: "怪物圖鑑",
    description: "各區域怪物的等級、弱點與掉落資訊。",
    color: "border-cele-gold/40 bg-white/70 hover:border-cele-gold/70",
    eyebrowColor: "text-cele-gold",
  },
  {
    href: "/dungeons",
    eyebrow: "DUNGEONS",
    title: "副本攻略",
    description: "各副本的入場條件、BOSS 機制與通關技巧。",
    color: "border-cele-violet/40 bg-white/70 hover:border-cele-violet/70",
    eyebrowColor: "text-cele-violet",
  },
  {
    href: "/events",
    eyebrow: "EVENTS",
    title: "活動攻略",
    description: "限時活動的任務流程、獎勵與參與方式。",
    color: "border-cele-gold/40 bg-white/70 hover:border-cele-gold/70",
    eyebrowColor: "text-cele-gold",
  },
];

export default function GuidesPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <p className="text-sm font-black tracking-[0.22em] text-cele-teal">文靜之潭資料庫</p>
        <h1 className="mt-4 text-5xl font-black text-slate-900">攻略目錄</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          職業、怪物等各式遊戲攻略一覽。
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className={`group rounded-2xl border p-8 backdrop-blur transition hover:-translate-y-1 ${g.color}`}
            >
              <p className={`text-xs font-black tracking-[0.18em] ${g.eyebrowColor}`}>{g.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-black text-slate-900">{g.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{g.description}</p>
              <p className={`mt-6 text-sm font-bold ${g.eyebrowColor} opacity-75 transition group-hover:opacity-100`}>
                前往 →
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
