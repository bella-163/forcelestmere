"use client";

import { useState } from "react";

type Post = {
  id: string;
  date: string;
  title: string;
  content: string;
  tag: string;
  tagType: string;
};

const TAG_COLORS: Record<string, string> = {
  important: "bg-red-100 text-red-600",
  event:     "bg-emerald-100 text-emerald-600",
  update:    "bg-blue-100 text-blue-600",
  general:   "bg-slate-100 text-slate-500",
};

const PAGE_SIZE = 3;

export function NewsCarousel({ posts }: { posts: Post[] }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const visible = posts.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="relative flex items-center gap-3">
      {/* Left arrow */}
      <button
        onClick={() => setPage((p) => Math.max(0, p - 1))}
        disabled={page === 0}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/80 text-xl text-slate-500 shadow transition hover:bg-white disabled:opacity-0"
      >
        ‹
      </button>

      {/* Card */}
      <div className="flex-1 rounded-2xl border border-blue-200/60 bg-white/60 p-6 shadow-sm backdrop-blur">
        {/* Title */}
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="text-cele-teal">✦</span>
          <h2 className="text-lg font-black tracking-[0.18em] text-slate-800">最新消息</h2>
          <span className="text-cele-teal">✦</span>
        </div>

        {/* News list */}
        <div className="space-y-3 h-[220px] overflow-hidden">
          {visible.map((post) => (
            <div key={post.id} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white/70 px-4 py-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-bold ${TAG_COLORS[post.tagType] ?? TAG_COLORS.general}`}>
                    {post.tag}
                  </span>
                  <span className="truncate text-sm font-bold text-slate-800">{post.title}</span>
                </div>
                <p className="text-xs leading-5 text-slate-500 line-clamp-1">{post.content}</p>
              </div>
              <span className="shrink-0 text-xs text-slate-400">{post.date}</span>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        {totalPages > 1 && (
          <div className="mt-5 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-1.5 rounded-full transition-all ${i === page ? "w-5 bg-cele-teal" : "w-1.5 bg-slate-300"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
        disabled={page === totalPages - 1}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/80 text-xl text-slate-500 shadow transition hover:bg-white disabled:opacity-0"
      >
        ›
      </button>
    </div>
  );
}
