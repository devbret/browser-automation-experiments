import { useJson } from "../../hooks/useJson";
import type { PerformanceTiming } from "../../types/audit";
import { AsyncCard } from "../ui/AsyncCard";
import { BarChart, type BarDatum } from "../charts/BarChart";
import { palette } from "../../lib/theme";
import { formatMs } from "../../lib/format";

export function PerformancePanel() {
  const state = useJson<PerformanceTiming>("/data/performance-timing.json");

  return (
    <AsyncCard
      state={state}
      title="Performance Timeline"
      description="Navigation timing milestones relative to navigationStart"
      accent={["#22d3ee", "#0891b2"]}
      icon="⏱️"
      isEmpty={(d) => d.navigationStart === undefined}
      emptyMessage="No navigation timing captured."
    >
      {(data) => {
        const origin = data.navigationStart;
        const bars: BarDatum[] = Object.entries(data)
          .filter(([key, v]) => key !== "navigationStart" && v >= origin)
          .map(([key, v]) => ({
            label: key.replace("Event", ""),
            value: v - origin,
            color: palette.vitals,
          }));
        return (
          <BarChart
            data={bars}
            width={820}
            height={360}
            rotateLabels
            format={(v) => formatMs(v)}
          />
        );
      }}
    </AsyncCard>
  );
}
