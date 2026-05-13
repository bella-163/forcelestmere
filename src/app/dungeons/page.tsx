import { SiteHeader } from "@/components/layout/SiteHeader";

export default function DungeonsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <p className="text-sm font-black tracking-[0.22em] text-cele-violet">DUNGEONS</p>
        <h1 className="mt-4 text-5xl font-black text-slate-900">副本攻略</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          各副本的入場條件、BOSS 機制與通關技巧。
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white/70 p-8 text-slate-500">
          <p>副本攻略資料即將推出，敬請期待。</p>
        </div>
      </main>
    </>
  );
}
