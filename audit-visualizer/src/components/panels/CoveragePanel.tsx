import { useJson } from "../../hooks/useJson";
import type { CoverageReport } from "../../types/audit";
import { Card } from "../ui/Card";
import { GaugeChart } from "../charts/GaugeChart";
import { DataTable, type Column } from "../ui/DataTable";
import { Badge } from "../ui/Badge";
import { summarizeCoverage, type CoverageRow } from "../../lib/coverage";
import { formatBytes, formatPercent, shortenUrl } from "../../lib/format";
import { palette } from "../../lib/theme";

type Row = CoverageRow & { kind: "JS" | "CSS" };

const severity = (pct: number) =>
  pct >= 50 ? "#f43f5e" : pct >= 25 ? "#f59e0b" : "#10b981";

const columns: Column<Row>[] = [
  {
    key: "kind",
    header: "Type",
    sortValue: (r) => r.kind,
    render: (r) => (
      <Badge color={r.kind === "JS" ? palette.js : palette.css}>{r.kind}</Badge>
    ),
  },
  {
    key: "file",
    header: "File",
    sortValue: (r) => r.url,
    render: (r) => (
      <span className="block max-w-[280px] truncate text-slate-600" title={r.url}>
        {shortenUrl(r.url)}
      </span>
    ),
  },
  {
    key: "size",
    header: "Size",
    align: "right",
    sortValue: (r) => r.total,
    render: (r) => (
      <span className="tabular-nums text-slate-500">{formatBytes(r.total)}</span>
    ),
  },
  {
    key: "unused",
    header: "Unused",
    align: "right",
    sortValue: (r) => r.unusedPct,
    render: (r) => (
      <span className="font-semibold tabular-nums text-slate-700">
        {formatBytes(r.unused)}{" "}
        <span style={{ color: severity(r.unusedPct * 100) }}>
          ({formatPercent(r.unusedPct)})
        </span>
      </span>
    ),
  },
];

export function CoveragePanel() {
  const js = useJson<CoverageReport>("/data/js-coverage.json");
  const css = useJson<CoverageReport>("/data/css-coverage.json");
  const error = js.error || css.error;
  const loading = js.data === null || css.data === null;

  return (
    <Card
      title="Code Coverage"
      description="Unused JavaScript & CSS shipped to the browser"
      accent={["#facc15", "#ca8a04"]}
      icon="🧹"
    >
      {error ? (
        <p className="rounded-lg bg-rose-50 px-3 py-6 text-center text-sm font-medium text-rose-600">
          Failed to load: {error}
        </p>
      ) : loading ? (
        <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
      ) : (
        (() => {
          const jsSum = summarizeCoverage(js.data!);
          const cssSum = summarizeCoverage(css.data!);
          const rows: Row[] = [
            ...jsSum.rows.map((r) => ({ ...r, kind: "JS" as const })),
            ...cssSum.rows.map((r) => ({ ...r, kind: "CSS" as const })),
          ];
          const gauge = (
            label: string,
            pct: number,
            unused: number,
            total: number
          ) => (
            <div className="flex flex-col items-center">
              <GaugeChart value={pct * 100} color={severity(pct * 100)} size={140} />
              <span className="mt-1 text-xs font-semibold text-slate-500">
                {label} unused
              </span>
              <span className="text-[11px] text-slate-400">
                {formatBytes(unused)} of {formatBytes(total)}
              </span>
            </div>
          );
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {gauge("JS", jsSum.unusedPct, jsSum.unused, jsSum.total)}
                {gauge("CSS", cssSum.unusedPct, cssSum.unused, cssSum.total)}
              </div>
              {rows.length > 0 && (
                <DataTable
                  columns={columns}
                  rows={rows}
                  rowKey={(r, i) => `${r.url}-${i}`}
                  filterText={(r) => r.url}
                  filterPlaceholder="Filter files…"
                  initialSort={{ key: "unused", dir: "desc" }}
                  pageSize={6}
                />
              )}
            </div>
          );
        })()
      )}
    </Card>
  );
}
