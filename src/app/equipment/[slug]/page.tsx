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
        <Link href="/equipment" className="mb-8 inline-block text-sm text-slate-500 hover:text-slate-800">
          ← 所有裝備
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">{eq.type}</span>
          <span className={`text-sm font-black ${rarityColor[eq.rarity] ?? "text-slate-400"}`}>{eq.rarity}</span>
        </div>
        <h1 className="mt-3 text-5xl font-black text-slate-900">{eq.name}</h1>
        <p className="mt-2 text-sm text-slate-400">來源：{eq.source}</p>
        <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 p-5">
          <p className="text-xs font-black tracking-wider text-teal-600">效果</p>
          <p className="mt-2 text-slate-700">{eq.effect}</p>
        </div>
        <p className="mt-6 text-lg leading-8 text-slate-600">{eq.description}</p>
      </main>
    </>
  );
}
