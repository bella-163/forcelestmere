import Link from "next/link";
import { SimpleItemEditor } from "@/components/admin/SimpleItemEditor";
import type { FieldDef } from "@/components/admin/SimpleItemEditor";

const FIELDS: FieldDef[] = [
  { key: "name", label: "名稱", placeholder: "潭水史萊姆" },
  { key: "level", label: "等級", placeholder: "Lv.1-10" },
  { key: "weakness", label: "弱點", placeholder: "火焰" },
  { key: "description", label: "描述", type: "textarea", placeholder: "怪物描述..." },
];

export default function AdminMonstersPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-5 pt-8">
        <Link href="/admin" className="text-sm text-white/40 hover:text-white">
          ← 返回面板
        </Link>
      </div>
      <SimpleItemEditor
        dataKey="monsters"
        title="怪物管理"
        fields={FIELDS}
        hasSlug
        hasColor
        hasImage={false}
      />
    </>
  );
}
