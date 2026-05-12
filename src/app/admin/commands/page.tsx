import Link from "next/link";
import { SimpleItemEditor } from "@/components/admin/SimpleItemEditor";
import type { FieldDef } from "@/components/admin/SimpleItemEditor";

const FIELDS: FieldDef[] = [
  { key: "command", label: "指令", placeholder: "/spawn" },
  { key: "category", label: "分類", placeholder: "傳送" },
  { key: "description", label: "說明", placeholder: "回到主城" },
  { key: "cooldown", label: "冷卻", placeholder: "5 秒" },
];

export default function AdminCommandsPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-5 pt-8">
        <Link href="/admin" className="text-sm text-white/40 hover:text-white">
          ← 返回面板
        </Link>
      </div>
      <SimpleItemEditor
        dataKey="commands"
        title="指令管理"
        fields={FIELDS}
        hasSlug={false}
        hasColor={false}
        hasImage={false}
      />
    </>
  );
}
