import { SiteHeader } from "@/components/layout/SiteHeader";
import { readData } from "@/lib/data";
import type { CommandData } from "@/types/site";

export default function CommandsPage() {
  const commands = readData<CommandData[]>("commands");

  const categories = [...new Set(commands.map((c) => c.category))];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        <p className="text-sm font-black tracking-[0.22em] text-cele-teal">文靜之潭指令表</p>
        <h1 className="mt-4 text-5xl font-black text-slate-900">功能指令</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">伺服器常用指令一覽。</p>

        <div className="mt-10 space-y-8">
          {categories.map((cat) => (
            <div key={cat}>
              <h2 className="mb-4 text-sm font-black tracking-[0.18em] text-cele-teal">{cat}</h2>
              <div className="space-y-2">
                {commands
                  .filter((c) => c.category === cat)
                  .map((cmd) => (
                    <div
                      key={cmd.command}
                      className="flex flex-wrap items-baseline gap-4 rounded-xl border border-slate-200 bg-white/70 px-5 py-4"
                    >
                      <code className="shrink-0 rounded-lg bg-teal-50 px-3 py-1 font-mono text-sm font-bold text-teal-700">
                        {cmd.command}
                      </code>
                      <p className="flex-1 text-sm text-slate-600">{cmd.description}</p>
                      {cmd.cooldown && (
                        <span className="text-xs text-slate-400">冷卻：{cmd.cooldown}</span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
