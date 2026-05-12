import Link from "next/link";
import { SimpleItemEditor } from "@/components/admin/SimpleItemEditor";
import type { FieldDef } from "@/components/admin/SimpleItemEditor";

const FIELDS: FieldDef[] = [
  { key: "name", label: "名稱", placeholder: "靜謐之劍" },
  { key: "type", label: "類型", placeholder: "武器" },
  { key: "rarity", label: "稀有度", placeholder: "傳說" },
  { key: "source", label: "取得方式", placeholder: "Boss 掉落" },
  { key: "effect", label: "效果", placeholder: "機率觸發..." },
  { key: "description", label: "描述", type: "textarea", placeholder: "裝備描述..." },
];

export default function AdminEquipmentPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-5 pt-8">
        <Link href="/admin" className="text-sm text-white/40 hover:text-white">
          ← 返回面板
        </Link>
      </div>
      <SimpleItemEditor
        dataKey="equipment"
        title="裝備管理"
        fields={FIELDS}
        hasSlug
        hasColor
        hasImage={false}
      />
    </>
  );
}
