import type { Tip } from "../../hooks/useChartTooltip";

export function ChartTooltip({ tip }: { tip: Tip }) {
  if (!tip) return null;
  return (
    <div
      className="pointer-events-none absolute z-20 max-w-[240px] -translate-x-1/2 -translate-y-full rounded-lg bg-slate-900/95 px-3 py-1.5 text-xs leading-snug text-white shadow-xl ring-1 ring-white/10"
      style={{ left: tip.x, top: tip.y - 10 }}
    >
      {tip.content}
    </div>
  );
}
