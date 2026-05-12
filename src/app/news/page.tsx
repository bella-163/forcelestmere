import { SiteHeader } from "@/components/layout/SiteHeader";
import { readData } from "@/lib/data";
import type { NewsData } from "@/types/site";

export const dynamic = "force-dynamic";

const tagStyles: Record<string, string> = {
  important: "bg-red-500/20 text-red-400",
  event:     "bg-cele-gold/20 text-cele-gold",
  update:    "bg-cele-teal/20 text-cele-teal",
  general:   "bg-white/10 text-white/60",
};

export default function NewsPage() {
  const data = readData<NewsData>("news");
  const posts = [...data.posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        <p className="text-sm font-black tracking-[0.22em] text-cele-teal">文靜之潭公告欄</p>
        <h1 className="mt-4 text-5xl font-black text-white">最新消息</h1>
        <p className="mt-5 text-lg leading-8 text-white/65">伺服器更新、活動與重要公告。</p>

        <div className="mt-10 space-y-4">
          {posts.length === 0 && (
            <p className="text-white/40">目前尚無消息。</p>
          )}
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-white/40">{post.date}</span>
                <span className={`rounded-full px-3 py-0.5 text-xs font-black ${tagStyles[post.tagType] ?? tagStyles.general}`}>
                  {post.tag}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-black text-white">{post.title}</h2>
              {post.content && (
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-white/65">{post.content}</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
