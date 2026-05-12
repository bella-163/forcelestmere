import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { readData } from "@/lib/data";
import type { ClassData } from "@/types/site";

type Props = { params: Promise<{ slug: string }> };

export default async function ClassDetailPage({ params }: Props) {
  const { slug } = await params;
  const classes = readData<ClassData[]>("classes");
  const cls = classes.find((c) => c.slug === slug);
  if (!cls) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        <Link href="/classes" className="mb-8 inline-block text-sm text-white/40 hover:text-white">
          ← 所有職業
        </Link>
        <p className="text-sm font-black tracking-[0.18em] text-cele-teal">{cls.role}</p>
        <h1 className="mt-3 text-5xl font-black text-white">{cls.name}</h1>
        <p className="mt-2 text-sm text-white/45">難度：{cls.difficulty}</p>
        <p className="mt-6 text-lg leading-8 text-white/70">{cls.description}</p>
        {cls.features.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 text-lg font-black text-white">特色</h2>
            <div className="flex flex-wrap gap-2">
              {cls.features.map((f) => (
                <span key={f} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/75">
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
