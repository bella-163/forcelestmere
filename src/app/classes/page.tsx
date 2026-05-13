import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { readData } from "@/lib/data";
import type { ClassData } from "@/types/site";

const colorStyles: Record<string, { card: string; badge: string; arrow: string }> = {
  teal:   { card: "border-cele-teal/40 bg-white/70 hover:border-cele-teal/70",     badge: "bg-teal-100 text-teal-700",       arrow: "text-cele-teal" },
  blue:   { card: "border-cele-blue/40 bg-white/70 hover:border-cele-blue/70",     badge: "bg-blue-100 text-blue-700",       arrow: "text-cele-blue" },
  gold:   { card: "border-cele-gold/40 bg-white/70 hover:border-cele-gold/70",     badge: "bg-amber-100 text-amber-700",     arrow: "text-cele-gold" },
  violet: { card: "border-cele-violet/40 bg-white/70 hover:border-cele-violet/70", badge: "bg-violet-100 text-violet-700",   arrow: "text-cele-violet" },
  green:  { card: "border-emerald-500/40 bg-white/70 hover:border-emerald-400/70", badge: "bg-emerald-100 text-emerald-700", arrow: "text-emerald-600" },
  crimson:{ card: "border-red-500/40 bg-white/70 hover:border-red-400/70",         badge: "bg-red-100 text-red-600",         arrow: "text-red-500" },
  gray:   { card: "border-slate-400/40 bg-white/70 hover:border-slate-400/70",     badge: "bg-slate-100 text-slate-600",     arrow: "text-slate-500" },
};

export default function ClassesPage() {
  const classes = readData<ClassData[]>("classes");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <p className="text-sm font-black tracking-[0.22em] text-cele-teal">文靜之潭資料庫</p>
        <h1 className="mt-4 text-5xl font-black text-slate-900">職業介紹</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
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
                <h2 className="mt-3 text-3xl font-black text-slate-900">{cls.name}</h2>
                <p className="mt-2 text-xs text-slate-400">難度：{cls.difficulty}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{cls.description}</p>
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
