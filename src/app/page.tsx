import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { readData } from "@/lib/data";
import type { HomeData } from "@/types/site";

export const dynamic = "force-dynamic";

const themeStyles: Record<string, { card: string; eyebrow: string }> = {
  teal:   { card: "border-cele-teal/40 bg-white/70 hover:border-cele-teal/70",   eyebrow: "text-cele-teal" },
  blue:   { card: "border-cele-blue/40 bg-white/70 hover:border-cele-blue/70",   eyebrow: "text-cele-blue" },
  gold:   { card: "border-cele-gold/40 bg-white/70 hover:border-cele-gold/70",   eyebrow: "text-cele-gold" },
  violet: { card: "border-cele-violet/40 bg-white/70 hover:border-cele-violet/70", eyebrow: "text-cele-violet" },
};

export default function HomePage() {
  const home = readData<HomeData>("home");

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section
          className="relative px-5 pb-20 pt-28 text-center lg:px-8"
          style={{
            backgroundImage: "url('/images/bg.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#ddeef8]/70" />
          <div className="relative z-10">
          <p className="mb-4 text-sm font-black tracking-[0.22em] text-cele-teal">{home.hero.eyebrow}</p>
          <h1 className="mx-auto max-w-3xl text-5xl font-black leading-[1.1] text-slate-900 lg:text-7xl">
            {home.hero.title}
          </h1>
          <p className="mx-auto mt-8 max-w-xl whitespace-pre-line text-lg leading-8 text-slate-600">
            {home.hero.lead}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={home.hero.ctaPrimary.href}
              className="rounded-xl bg-cele-teal px-7 py-3.5 font-black text-white transition hover:bg-cele-teal/85"
            >
              {home.hero.ctaPrimary.text}
            </Link>
            <Link
              href={home.hero.ctaSecondary.href}
              className="rounded-xl border border-slate-300 bg-white/60 px-7 py-3.5 font-bold text-slate-700 transition hover:bg-white/90"
            >
              {home.hero.ctaSecondary.text}
            </Link>
          </div>
          {home.serverIPs.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {home.serverIPs.map((s) => (
                <span
                  key={s.label}
                  className="rounded-lg border border-slate-300 bg-white/60 px-4 py-2 text-sm font-mono text-slate-600"
                >
                  {s.label}: <span className="text-cele-teal">{s.ip}</span>
                </span>
              ))}
            </div>
          )}
          </div>
        </section>

        {/* Feature cards */}
        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {home.featureCards.map((card) => {
              const s = themeStyles[card.theme] ?? themeStyles.teal;
              const isExternal = card.href.startsWith("http");
              const className = `group rounded-2xl border p-6 backdrop-blur transition hover:-translate-y-1 ${s.card}`;
              const content = (
                <>
                  <p className={`text-xs font-black tracking-[0.18em] ${s.eyebrow}`}>{card.eyebrow}</p>
                  <h2 className="mt-3 text-2xl font-black text-slate-900">{card.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                  <p className={`mt-5 text-sm font-bold ${s.eyebrow} opacity-75 transition group-hover:opacity-100`}>
                    前往 →
                  </p>
                </>
              );
              return isExternal ? (
                <a key={card.href} href={card.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {content}
                </a>
              ) : (
                <Link key={card.href} href={card.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
