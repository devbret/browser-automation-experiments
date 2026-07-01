import { useJson } from "../../hooks/useJson";
import type { LighthouseScores, Meta } from "../../types/audit";
import { GaugeChart } from "../charts/GaugeChart";
import { scoreColor } from "../../lib/theme";
import { formatDateTime } from "../../lib/format";

export function HealthHeader() {
  const meta = useJson<Meta>("/data/meta.json");
  const lh = useJson<LighthouseScores>("/data/lighthouse-scores.json");

  const overall = lh.data
    ? Math.round(
        (lh.data.performance +
          lh.data.accessibility +
          lh.data.bestPractices +
          lh.data.seo) /
          4
      )
    : null;

  return (
    <header
      className="relative overflow-hidden rounded-3xl px-6 py-7 text-white shadow-xl sm:px-9"
      style={{
        background:
          "linear-gradient(120deg, #6366f1 0%, #8b5cf6 40%, #d946ef 75%, #f59e0b 130%)",
      }}
    >
      <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            ⚡ Web Audit Visualizer
          </p>
          <h1 className="mt-1 text-3xl font-black leading-tight sm:text-4xl">
            Site Health Report
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/85">
            {meta.data?.url && (
              <a
                href={meta.data.url}
                target="_blank"
                rel="noreferrer"
                className="max-w-[70vw] truncate font-semibold underline decoration-white/40 underline-offset-2 hover:decoration-white"
              >
                {meta.data.url}
              </a>
            )}
            {meta.data?.timestamp && (
              <span className="text-white/70">
                · Audited {formatDateTime(meta.data.timestamp)}
              </span>
            )}
          </div>
        </div>

        {overall !== null && (
          <div className="flex shrink-0 flex-col items-center rounded-2xl bg-white/95 px-6 py-4 shadow-lg">
            <div className="w-28">
              <GaugeChart
                value={overall}
                color={scoreColor(overall)}
                size={112}
              />
            </div>
            <span className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
              Overall Health
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
