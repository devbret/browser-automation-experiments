import { useJson } from "../../hooks/useJson";
import type { AccessibilityReport, AxeViolation } from "../../types/audit";
import { AsyncCard } from "../ui/AsyncCard";
import { BarChart, type BarDatum } from "../charts/BarChart";
import { DataTable, type Column } from "../ui/DataTable";
import { Badge } from "../ui/Badge";
import { impactColors, impactOrder } from "../../lib/theme";

const columns: Column<AxeViolation>[] = [
  {
    key: "impact",
    header: "Impact",
    sortValue: (r) => impactOrder.indexOf((r.impact ?? "minor") as never),
    render: (r) => (
      <Badge color={impactColors[r.impact ?? "unknown"]}>
        {r.impact ?? "n/a"}
      </Badge>
    ),
  },
  {
    key: "rule",
    header: "Rule",
    sortValue: (r) => r.id,
    render: (r) => (
      <div>
        <span className="font-semibold text-slate-800">{r.id}</span>
        <p className="text-xs text-slate-500">{r.help}</p>
      </div>
    ),
  },
  {
    key: "elements",
    header: "Elements",
    align: "right",
    sortValue: (r) => r.nodes.length,
    render: (r) => (
      <span className="font-semibold tabular-nums text-slate-700">
        {r.nodes.length}
      </span>
    ),
  },
];

export function AccessibilityPanel() {
  const state = useJson<AccessibilityReport>("/data/accessibility-report.json");

  return (
    <AsyncCard
      state={state}
      title="Accessibility Violations"
      description="axe-core findings grouped by impact, with affected elements"
      accent={["#60a5fa", "#2563eb"]}
      icon="♿"
      isEmpty={(d) => d.violations.length === 0}
      emptyIcon="✅"
      emptyMessage="No accessibility violations detected!"
    >
      {(data) => {
        const bars: BarDatum[] = impactOrder.map((impact) => ({
          label: impact,
          value: data.violations
            .filter((v) => v.impact === impact)
            .reduce((sum, v) => sum + v.nodes.length, 0),
          color: impactColors[impact],
        }));
        const passes = data.passes?.length ?? 0;
        const elements = data.violations.reduce(
          (s, v) => s + v.nodes.length,
          0
        );
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              <span className="font-bold text-rose-600">
                {data.violations.length}
              </span>{" "}
              violations across{" "}
              <span className="font-bold text-slate-700">{elements}</span>{" "}
              elements ·{" "}
              <span className="font-bold text-emerald-600">{passes}</span> checks
              passed
            </p>
            <BarChart data={bars} height={200} format={(v) => `${v} elements`} />
            <DataTable
              columns={columns}
              rows={data.violations}
              rowKey={(r) => r.id}
              filterText={(r) => `${r.id} ${r.help} ${r.description}`}
              filterPlaceholder="Filter rules…"
              initialSort={{ key: "elements", dir: "desc" }}
              pageSize={5}
            />
          </div>
        );
      }}
    </AsyncCard>
  );
}
