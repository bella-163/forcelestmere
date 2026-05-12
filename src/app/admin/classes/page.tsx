import Link from "next/link";
import { SimpleItemEditor } from "@/components/admin/SimpleItemEditor";
import type { FieldDef } from "@/components/admin/SimpleItemEditor";

const FIELDS: FieldDef[] = [
  { key: "name", label: "名稱", placeholder: "戰士" },
  { key: "role", label: "定位", placeholder: "近戰・坦克" },
  { key: "difficulty", label: "難度", placeholder: "新手友善" },
  { key: "description", label: "簡介", type: "textarea", placeholder: "職業描述..." },
];

export default function AdminClassesPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-5 pt-8">
        <Link href="/admin" className="text-sm text-white/40 hover:text-white">
          ← 返回面板
        </Link>
      </div>
      <SimpleItemEditor
        dataKey="classes"
        title="職業管理"
        fields={FIELDS}
        hasSlug
        hasColor
        hasImage={false}
      />
    </>
  );
}
