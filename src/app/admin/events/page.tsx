import Link from "next/link";
import { SimpleItemEditor } from "@/components/admin/SimpleItemEditor";
import type { FieldDef } from "@/components/admin/SimpleItemEditor";

const FIELDS: FieldDef[] = [
  { key: "name", label: "活動名稱", placeholder: "春季慶典" },
  { key: "period", label: "活動期間", placeholder: "2024/04/01 – 2024/04/30" },
  { key: "description", label: "攻略說明", type: "textarea", placeholder: "活動流程、任務與獎勵說明..." },
];

export default function AdminEventsPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-5 pt-8">
        <Link href="/admin" className="text-sm text-white/40 hover:text-white">
          ← 返回面板
        </Link>
      </div>
      <SimpleItemEditor
        dataKey="events"
        title="活動管理"
        fields={FIELDS}
        hasSlug
        hasColor
        hasImage={false}
      />
    </>
  );
}
