import Link from "next/link";
import { NewsEditor } from "@/components/admin/NewsEditor";

export default function AdminNewsPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-5 pt-8">
        <Link href="/admin" className="text-sm text-white/40 hover:text-white">
          ← 返回面板
        </Link>
      </div>
      <NewsEditor />
    </>
  );
}
