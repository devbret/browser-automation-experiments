import { useJson } from "../../hooks/useJson";
import type { LinkStatus, LinkStatusReport } from "../../types/audit";
import { AsyncCard } from "../ui/AsyncCard";
import { DonutChart, type DonutDatum } from "../charts/DonutChart";
import { DataTable, type Column } from "../ui/DataTable";
import { Badge } from "../ui/Badge";
import { statusColor } from "../../lib/theme";

function bucket(status: number | "error"): string {
  if (status === "error") return "Error";
  const code = Number(status);
  if (code < 300) return "2xx OK";
  if (code < 400) return "3xx Redirect";
  if (code < 500) return "4xx Client";
  return "5xx Server";
}

const bucketColor: Record<string, string> = {
  "2xx OK": statusColor(200),
  "3xx Redirect": statusColor(301),
  "4xx Client": statusColor(404),
  "5xx Server": statusColor(500),
  Error: statusColor("error"),
};

const columns: Column<LinkStatus>[] = [
  {
    key: "status",
    header: "Status",
    sortValue: (r) => (r.status === "error" ? 999 : Number(r.status)),
    render: (r) => (
      <Badge color={statusColor(r.status)}>{String(r.status)}</Badge>
    ),
  },
  {
    key: "link",
    header: "URL",
    sortValue: (r) => r.link,
    render: (r) => (
      <a
        href={r.link}
        target="_blank"
        rel="noreferrer"
        className="block max-w-[320px] truncate text-slate-600 hover:text-indigo-600 hover:underline"
        title={r.link}
      >
        {r.link}
      </a>
    ),
  },
];

export function LinksPanel() {
  const state = useJson<LinkStatusReport>("/data/link-statuses.json");

  return (
    <AsyncCard
      state={state}
      title="Link Status Codes"
      description="Every scanned link by HTTP status bucket"
      accent={["#2dd4bf", "#0d9488"]}
      icon="🔗"
      isEmpty={(d) => d.length === 0}
      emptyMessage="No links found on the page."
    >
      {(data) => {
        const counts = new Map<string, number>();
        for (const l of data)
          counts.set(bucket(l.status), (counts.get(bucket(l.status)) ?? 0) + 1);
        const donut: DonutDatum[] = [
          "2xx OK",
          "3xx Redirect",
          "4xx Client",
          "5xx Server",
          "Error",
        ]
          .filter((b) => counts.get(b))
          .map((b) => ({
            label: b,
            value: counts.get(b)!,
            color: bucketColor[b],
          }));
        const broken = data.filter(
          (l) => l.status === "error" || Number(l.status) >= 400
        ).length;
        return (
          <div className="space-y-4">
            <DonutChart
              data={donut}
              centerValue={data.length}
              centerLabel="links"
            />
            <p className="text-xs text-slate-500">
              <span className="font-bold text-rose-600">{broken}</span> broken or
              failing ·{" "}
              <span className="font-bold text-emerald-600">
                {data.length - broken}
              </span>{" "}
              healthy
            </p>
            <DataTable
              columns={columns}
              rows={data}
              rowKey={(r, i) => `${r.link}-${i}`}
              filterText={(r) => `${r.link} ${r.status}`}
              filterPlaceholder="Filter links…"
              initialSort={{ key: "status", dir: "desc" }}
              pageSize={6}
            />
          </div>
        );
      }}
    </AsyncCard>
  );
}
