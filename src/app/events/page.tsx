import { SiteHeader } from "@/components/layout/SiteHeader";

export default function EventsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <p className="text-sm font-black tracking-[0.22em] text-cele-gold">EVENTS</p>
        <h1 className="mt-4 text-5xl font-black text-slate-900">活動攻略</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          限時活動的任務流程、獎勵與參與方式。
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white/70 p-8 text-slate-500">
          <p>活動攻略資料即將推出，敬請期待。</p>
        </div>
      </main>
    </>
  );
}
