import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { NewsCarousel } from "@/components/NewsCarousel";
import { readData } from "@/lib/data";
import type { HomeData, NewsData } from "@/types/site";

export const dynamic = "force-dynamic";

const themeStyles: Record<string, { card: string; eyebrow: string }> = {
  teal:   { card: "border-cele-teal/40 bg-white/70 hover:border-cele-teal/70",   eyebrow: "text-cele-teal" },
  blue:   { card: "border-cele-blue/40 bg-white/70 hover:border-cele-blue/70",   eyebrow: "text-cele-blue" },
  gold:   { card: "border-cele-gold/40 bg-white/70 hover:border-cele-gold/70",   eyebrow: "text-cele-gold" },
  violet: { card: "border-cele-violet/40 bg-white/70 hover:border-cele-violet/70", eyebrow: "text-cele-violet" },
};

export default function HomePage() {
  const home = readData<HomeData>("home");
  const news = readData<NewsData>("news");

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section
          className="relative flex min-h-screen flex-col items-center justify-center px-5 pb-48 pt-28 text-center lg:px-8"
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
            <p className="mx-auto mt-6 max-w-xl whitespace-pre-line text-lg leading-8 text-slate-600">
              {home.hero.lead}
            </p>
          </div>
        </section>

        {/* News carousel — overlaps hero bottom */}
        <div className="relative z-10 mx-auto -mt-24 max-w-3xl px-5 pb-12 lg:px-8">
          <NewsCarousel posts={news.posts} />
        </div>

        {/* Feature cards */}
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 lg:px-8">
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
