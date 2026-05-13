import Link from "next/link";
import { SimpleItemEditor } from "@/components/admin/SimpleItemEditor";
import type { FieldDef } from "@/components/admin/SimpleItemEditor";

const FIELDS: FieldDef[] = [
  { key: "name", label: "副本名稱", placeholder: "深淵試煉" },
  { key: "level", label: "建議等級", placeholder: "Lv.30+" },
  { key: "description", label: "攻略說明", type: "textarea", placeholder: "副本流程與通關技巧..." },
];

export default function AdminDungeonsPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-5 pt-8">
        <Link href="/admin" className="text-sm text-white/40 hover:text-white">
          ← 返回面板
        </Link>
      </div>
      <SimpleItemEditor
        dataKey="dungeons"
        title="副本管理"
        fields={FIELDS}
        hasSlug
        hasColor
        hasImage={false}
      />
    </>
  );
}
