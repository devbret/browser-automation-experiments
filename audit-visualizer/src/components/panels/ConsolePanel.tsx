import { useJson } from "../../hooks/useJson";
import type { ConsoleMessage, ConsoleMessages } from "../../types/audit";
import { AsyncCard } from "../ui/AsyncCard";
import { DonutChart, type DonutDatum } from "../charts/DonutChart";
import { DataTable, type Column } from "../ui/DataTable";
import { Badge } from "../ui/Badge";
import { consoleTypeColor } from "../../lib/theme";

const columns: Column<ConsoleMessage>[] = [
  {
    key: "type",
    header: "Type",
    sortValue: (r) => r.type,
    render: (r) => <Badge color={consoleTypeColor(r.type)}>{r.type}</Badge>,
  },
  {
    key: "text",
    header: "Message",
    sortValue: (r) => r.text,
    render: (r) => (
      <span className="block max-w-[360px] truncate font-mono text-xs text-slate-600" title={r.text}>
        {r.text}
      </span>
    ),
  },
];

export function ConsolePanel() {
  const state = useJson<ConsoleMessages>("/data/console-logs.json");

  return (
    <AsyncCard
      state={state}
      title="Console Output"
      description="Browser console messages captured during load"
      accent={["#818cf8", "#4f46e5"]}
      icon="🖥️"
      isEmpty={(d) => d.length === 0}
      emptyIcon="🤫"
      emptyMessage="The console stayed quiet."
    >
      {(data) => {
        const counts = new Map<string, number>();
        for (const m of data) counts.set(m.type, (counts.get(m.type) ?? 0) + 1);
        const donut: DonutDatum[] = [...counts.entries()]
          .map(([label, value]) => ({
            label,
            value,
            color: consoleTypeColor(label),
          }))
          .sort((a, b) => b.value - a.value);
        return (
          <div className="space-y-4">
            <DonutChart
              data={donut}
              centerValue={data.length}
              centerLabel="messages"
            />
            <DataTable
              columns={columns}
              rows={data}
              rowKey={(_, i) => i}
              filterText={(r) => `${r.type} ${r.text}`}
              filterPlaceholder="Filter messages…"
              pageSize={6}
            />
          </div>
        );
      }}
    </AsyncCard>
  );
}
