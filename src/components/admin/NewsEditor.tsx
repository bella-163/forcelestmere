"use client";

import { useState, useEffect } from "react";
import type { NewsData, NewsPost } from "@/types/site";

const TAG_OPTIONS = [
  { label: "重要", value: "重要", type: "important" as const },
  { label: "活動", value: "活動", type: "event" as const },
  { label: "更新", value: "更新", type: "update" as const },
  { label: "公告", value: "公告", type: "general" as const },
];

function createPost(): NewsPost {
  return {
    id: Date.now().toString(),
    date: new Date().toISOString().split("T")[0],
    title: "",
    content: "",
    tag: "公告",
    tagType: "general",
  };
}

const input =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-cele-teal/60";

export function NewsEditor() {
  const [data, setData] = useState<NewsData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [draft, setDraft] = useState<NewsPost>(createPost());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/data?key=news")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const sortedPosts = data
    ? [...data.posts].sort((a, b) => b.date.localeCompare(a.date))
    : [];

  async function persist(updated: NewsData) {
    setSaving(true);
    await fetch("/api/admin/data?key=news", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function addPost() {
    if (!draft.title.trim()) return;
    const updated: NewsData = { posts: [...(data?.posts ?? []), draft] };
    setData(updated);
    persist(updated);
    setDraft(createPost());
    setShowAddForm(false);
  }

  function deletePost(postId: string) {
    if (!confirm("確定要刪除這則消息嗎？")) return;
    const updated: NewsData = { posts: (data?.posts ?? []).filter((p) => p.id !== postId) };
    setData(updated);
    persist(updated);
  }

  function updatePostField(postId: string, field: keyof NewsPost, value: string) {
    if (!data) return;
    const posts = data.posts.map((p) => {
      if (p.id !== postId) return p;
      if (field === "tag") {
        const opt = TAG_OPTIONS.find((o) => o.value === value);
        return { ...p, tag: value, tagType: opt?.type ?? "general" };
      }
      return { ...p, [field]: value };
    });
    setData({ posts });
  }

  function saveEdits() {
    if (data) persist(data);
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-white/50">載入中...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">最新消息管理</h1>
          <p className="mt-1 text-sm text-white/45">{sortedPosts.length} 則消息，依日期由新到舊排列</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setShowAddForm(true); setExpandedId(null); }}
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-black text-white hover:bg-white/10"
          >
            + 新增消息
          </button>
          <button
            onClick={saveEdits}
            disabled={saving}
            className="rounded-xl bg-cele-teal px-6 py-2.5 font-black text-white transition hover:bg-cele-teal/85 disabled:opacity-50"
          >
            {saving ? "儲存中..." : saved ? "已儲存 ✓" : "儲存"}
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="mb-6 rounded-2xl border border-cele-teal/40 bg-cele-teal/5 p-6">
          <h2 className="mb-5 text-xl font-black text-white">新增消息</h2>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-white/50">標題</label>
                <input
                  value={draft.title}
                  onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                  placeholder="消息標題"
                  className={input}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-white/50">日期</label>
                <input
                  type="date"
                  value={draft.date}
                  onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
                  className={input}
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-white/50">內文</label>
              <textarea
                rows={4}
                value={draft.content}
                onChange={(e) => setDraft((d) => ({ ...d, content: e.target.value }))}
                placeholder="消息內容..."
                className={input + " resize-none"}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-white/50">標籤</label>
              <select
                value={draft.tag}
                onChange={(e) => {
                  const opt = TAG_OPTIONS.find((o) => o.value === e.target.value);
                  setDraft((d) => ({ ...d, tag: e.target.value, tagType: opt?.type ?? "general" }));
                }}
                className={input}
              >
                {TAG_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button
              onClick={addPost}
              className="rounded-xl bg-cele-teal px-6 py-2.5 font-black text-white hover:bg-cele-teal/85"
            >
              新增
            </button>
            <button
              onClick={() => { setShowAddForm(false); setDraft(createPost()); }}
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-2.5 font-bold text-white/70 hover:text-white"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {sortedPosts.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <p className="text-white/40">尚無消息，點擊「新增消息」開始新增。</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedPosts.map((post) => (
            <div key={post.id} className="rounded-2xl border border-white/10 bg-white/[0.03]">
              <div
                className="flex cursor-pointer items-center gap-4 p-4"
                onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
              >
                <span className="shrink-0 rounded-lg bg-white/10 px-3 py-1 text-xs font-bold text-white/60">
                  {post.date}
                </span>
                <span className="shrink-0 rounded-full bg-cele-teal/20 px-2.5 py-0.5 text-xs font-bold text-cele-teal">
                  {post.tag}
                </span>
                <p className="flex-1 font-bold text-white">{post.title || "(無標題)"}</p>
                <span className="text-xs text-white/30">{expandedId === post.id ? "▲" : "▼"}</span>
              </div>

              {expandedId === post.id && (
                <div className="border-t border-white/10 p-5">
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-white/50">標題</label>
                        <input
                          value={post.title}
                          onChange={(e) => updatePostField(post.id, "title", e.target.value)}
                          className={input}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-white/50">日期</label>
                        <input
                          type="date"
                          value={post.date}
                          onChange={(e) => updatePostField(post.id, "date", e.target.value)}
                          className={input}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-white/50">內文</label>
                      <textarea
                        rows={4}
                        value={post.content}
                        onChange={(e) => updatePostField(post.id, "content", e.target.value)}
                        className={input + " resize-none"}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-white/50">標籤</label>
                      <select
                        value={post.tag}
                        onChange={(e) => updatePostField(post.id, "tag", e.target.value)}
                        className={input}
                      >
                        {TAG_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-between">
                    <button
                      onClick={() => deletePost(post.id)}
                      className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-2 text-sm font-bold text-red-400 hover:bg-red-500/20"
                    >
                      刪除
                    </button>
                    <button
                      onClick={saveEdits}
                      disabled={saving}
                      className="rounded-xl bg-cele-teal px-6 py-2 text-sm font-bold text-white hover:bg-cele-teal/85 disabled:opacity-50"
                    >
                      {saving ? "儲存中..." : saved ? "已儲存 ✓" : "儲存變更"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
