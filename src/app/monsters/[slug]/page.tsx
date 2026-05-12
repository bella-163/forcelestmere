import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { readData } from "@/lib/data";
import type { MonsterData } from "@/types/site";

type Props = { params: Promise<{ slug: string }> };

export default async function MonsterDetailPage({ params }: Props) {
  const { slug } = await params;
  const monsters = readData<MonsterData[]>("monsters");
  const monster = monsters.find((m) => m.slug === slug);
  if (!monster) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        <Link href="/monsters" className="mb-8 inline-block text-sm text-white/40 hover:text-white">
          ← 怪物圖鑑
        </Link>
        <p className="text-sm font-black tracking-wider text-cele-teal">{monster.level}</p>
        <h1 className="mt-3 text-5xl font-black text-white">{monster.name}</h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-black tracking-wider text-white/40">弱點</p>
            <p className="mt-2 font-bold text-white">{monster.weakness}</p>
          </div>
          {monster.drops.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs font-black tracking-wider text-white/40">掉落物品</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {monster.drops.map((d) => (
                  <span key={d} className="rounded-lg bg-white/10 px-2.5 py-1 text-sm text-white/75">{d}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="mt-8 text-lg leading-8 text-white/70">{monster.description}</p>
      </main>
    </>
  );
}
