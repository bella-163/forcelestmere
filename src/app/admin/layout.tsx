export const metadata = { title: "管理員面板 | 文靜之潭" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#060d12]">{children}</div>;
}
