"use client";

import { useState, useEffect } from "react";

export type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "select";
  options?: string[];
  placeholder?: string;
};

type Item = Record<string, string | string[]>;

const COLORS = ["teal", "blue", "gold", "violet", "green", "crimson", "gray"];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[\s一-鿿]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "") || Date.now().toString();
}

function createItem(fields: FieldDef[]): Item {
  const obj: Item = { slug: "", color: "teal", image: "" };
  for (const f of fields) {
    obj[f.key] = f.type === "textarea" ? "" : "";
  }
  return obj;
}

const inp =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-cele-teal/60";

type Props = {
  dataKey: string;
  title: string;
  fields: FieldDef[];
  hasSlug?: boolean;
  hasColor?: boolean;
  hasImage?: boolean;
};

export function SimpleItemEditor({ dataKey, title, fields, hasSlug = true, hasColor = true, hasImage = false }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState<Item>(() => createItem(fields));
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/admin/data?key=${dataKey}`)
      .then((r) => r.json())
      .then((d) => {
        setItems(Array.isArray(d) ? d : []);
        setLoading(false);
      });
  }, [dataKey]);

  async function persist(updated: Item[]) {
    setSaving(true);
    await fetch(`/api/admin/data?key=${dataKey}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function addItem() {
    const name = (draft["name"] as string) || "";
    if (!name.trim()) return;
    const newItem = { ...draft };
    if (hasSlug && !newItem.slug) newItem.slug = slugify(name);
    const updated = [...items, newItem];
    setItems(updated);
    persist(updated);
    setDraft(createItem(fields));
    setShowAdd(false);
  }

  function deleteItem(idx: number) {
    if (!confirm("確定要刪除嗎？")) return;
    const updated = items.filter((_, i) => i !== idx);
    setItems(updated);
    persist(updated);
    if (expandedIdx === idx) setExpandedIdx(null);
  }

  function updateField(idx: number, key: string, value: string) {
    const updated = items.map((item, i) => {
      if (i !== idx) return item;
      return { ...item, [key]: value };
    });
    setItems(updated);
  }

  function saveEdits() {
    persist(items);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-white/50">載入中...</p>
      </div>
    );
  }

  const allFields: FieldDef[] = [
    ...(hasSlug ? [{ key: "slug", label: "Slug（英文 ID）", placeholder: "warrior" }] : []),
    ...fields,
    ...(hasColor ? [{ key: "color", label: "主題色", type: "select" as const, options: COLORS }] : []),
    ...(hasImage ? [{ key: "image", label: "圖片網址", placeholder: "/images/..." }] : []),
  ];

  function renderField(key: string, value: string, onChange: (v: string) => void, f: FieldDef) {
    if (f.type === "textarea") {
      return (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={f.placeholder}
          className={inp + " resize-none"}
        />
      );
    }
    if (f.type === "select" || key === "color") {
      const opts = f.options ?? COLORS;
      return (
        <select value={value} onChange={(e) => onChange(e.target.value)} className={inp}>
          {opts.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    }
    return (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={f.placeholder}
        className={inp}
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">{title}</h1>
          <p className="mt-1 text-sm text-white/45">{items.length} 筆資料</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setShowAdd(true); setExpandedIdx(null); }}
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-black text-white hover:bg-white/10"
          >
            + 新增
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

      {showAdd && (
        <div className="mb-6 rounded-2xl border border-cele-teal/40 bg-cele-teal/5 p-6">
          <h2 className="mb-5 text-xl font-black text-white">新增項目</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {allFields.map((f) => (
              <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="mb-1.5 block text-xs font-bold text-white/50">{f.label}</label>
                {renderField(
                  f.key,
                  (draft[f.key] as string) ?? "",
                  (v) => setDraft((d) => ({ ...d, [f.key]: v })),
                  f
                )}
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <button
              onClick={addItem}
              className="rounded-xl bg-cele-teal px-6 py-2.5 font-black text-white hover:bg-cele-teal/85"
            >
              新增
            </button>
            <button
              onClick={() => { setShowAdd(false); setDraft(createItem(fields)); }}
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-2.5 font-bold text-white/70 hover:text-white"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <p className="text-white/40">尚無資料，點擊「新增」開始新增。</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03]">
              <div
                className="flex cursor-pointer items-center gap-4 p-4"
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
              >
                <p className="flex-1 font-bold text-white">{(item["name"] as string) || "(無名稱)"}</p>
                {item["role"] && <span className="text-sm text-white/40">{item["role"] as string}</span>}
                {item["type"] && <span className="text-sm text-white/40">{item["type"] as string}</span>}
                {item["level"] && <span className="text-sm text-white/40">{item["level"] as string}</span>}
                <span className="text-xs text-white/30">{expandedIdx === idx ? "▲" : "▼"}</span>
              </div>

              {expandedIdx === idx && (
                <div className="border-t border-white/10 p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {allFields.map((f) => (
                      <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                        <label className="mb-1.5 block text-xs font-bold text-white/50">{f.label}</label>
                        {renderField(
                          f.key,
                          (item[f.key] as string) ?? "",
                          (v) => updateField(idx, f.key, v),
                          f
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex justify-between">
                    <button
                      onClick={() => deleteItem(idx)}
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
