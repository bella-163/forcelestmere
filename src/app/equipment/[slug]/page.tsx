import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { readData } from "@/lib/data";
import type { EquipmentData } from "@/types/site";

type Props = { params: Promise<{ slug: string }> };

const rarityColor: Record<string, string> = {
  "傳說": "text-cele-gold",
  "史詩": "text-cele-violet",
  "稀有": "text-cele-blue",
};

export default async function EquipmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const equipment = readData<EquipmentData[]>("equipment");
  const eq = equipment.find((e) => e.slug === slug);
  if (!eq) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        <Link href="/equipment" className="mb-8 inline-block text-sm text-white/40 hover:text-white">
          ← 所有裝備
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/45">{eq.type}</span>
          <span className={`text-sm font-black ${rarityColor[eq.rarity] ?? "text-white/50"}`}>{eq.rarity}</span>
        </div>
        <h1 className="mt-3 text-5xl font-black text-white">{eq.name}</h1>
        <p className="mt-2 text-sm text-white/45">來源：{eq.source}</p>
        <div className="mt-6 rounded-2xl border border-cele-teal/30 bg-cele-teal/5 p-5">
          <p className="text-xs font-black tracking-wider text-cele-teal">效果</p>
          <p className="mt-2 text-white/80">{eq.effect}</p>
        </div>
        <p className="mt-6 text-lg leading-8 text-white/70">{eq.description}</p>
      </main>
    </>
  );
}
