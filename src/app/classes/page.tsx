import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { readData } from "@/lib/data";
import type { ClassData } from "@/types/site";

const colorStyles: Record<string, { card: string; badge: string; arrow: string }> = {
  teal:   { card: "border-cele-teal/45 bg-cele-teal/8 hover:border-cele-teal/70",     badge: "bg-cele-teal/20 text-cele-teal",     arrow: "text-cele-teal" },
  blue:   { card: "border-cele-blue/45 bg-cele-blue/8 hover:border-cele-blue/70",     badge: "bg-cele-blue/20 text-cele-blue",     arrow: "text-cele-blue" },
  gold:   { card: "border-cele-gold/45 bg-cele-gold/8 hover:border-cele-gold/70",     badge: "bg-cele-gold/20 text-cele-gold",     arrow: "text-cele-gold" },
  violet: { card: "border-cele-violet/45 bg-cele-violet/8 hover:border-cele-violet/70", badge: "bg-cele-violet/20 text-cele-violet", arrow: "text-cele-violet" },
  green:  { card: "border-emerald-500/45 bg-emerald-500/8 hover:border-emerald-400/70", badge: "bg-emerald-500/20 text-emerald-400", arrow: "text-emerald-400" },
  crimson:{ card: "border-red-500/45 bg-red-500/8 hover:border-red-400/70",           badge: "bg-red-500/20 text-red-400",         arrow: "text-red-400" },
  gray:   { card: "border-slate-500/45 bg-slate-500/8 hover:border-slate-400/70",     badge: "bg-slate-500/20 text-slate-300",     arrow: "text-slate-300" },
};

export default function ClassesPage() {
  const classes = readData<ClassData[]>("classes");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <p className="text-sm font-black tracking-[0.22em] text-cele-teal">文靜之潭資料庫</p>
        <h1 className="mt-4 text-5xl font-black text-white">職業介紹</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
          各職業的定位、特色與推薦玩法。
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => {
            const s = colorStyles[cls.color] ?? colorStyles.teal;
            return (
              <Link
                key={cls.slug}
                href={`/classes/${cls.slug}`}
                className={`group rounded-2xl border p-6 backdrop-blur transition hover:-translate-y-1 ${s.card}`}
              >
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-black ${s.badge}`}>
                  {cls.role}
                </span>
                <h2 className="mt-3 text-3xl font-black text-white">{cls.name}</h2>
                <p className="mt-2 text-xs text-white/45">難度：{cls.difficulty}</p>
                <p className="mt-3 text-sm leading-7 text-white/65">{cls.description}</p>
                <div className={`mt-5 flex items-center gap-1 text-sm font-bold ${s.arrow}`}>
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
