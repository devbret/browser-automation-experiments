import { useJson } from "../../hooks/useJson";
import type { LighthouseScores } from "../../types/audit";
import { AsyncCard } from "../ui/AsyncCard";
import { GaugeChart } from "../charts/GaugeChart";
import { scoreColor } from "../../lib/theme";

const LABELS: [keyof LighthouseScores, string][] = [
  ["performance", "Performance"],
  ["accessibility", "Accessibility"],
  ["bestPractices", "Best Practices"],
  ["seo", "SEO"],
];

export function LighthousePanel() {
  const state = useJson<LighthouseScores>("/data/lighthouse-scores.json");
  return (
    <AsyncCard
      state={state}
      title="Lighthouse Scores"
      description="Category scores from a full Lighthouse audit"
      accent={["#a78bfa", "#7c3aed"]}
      icon="🌟"
    >
      {(data) => (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {LABELS.map(([key, label]) => (
            <div key={key} className="flex flex-col items-center">
              <GaugeChart value={data[key]} color={scoreColor(data[key])} />
              <span className="mt-1 text-center text-xs font-semibold text-slate-500">
                {label}
              </span>
            </div>
          ))}
        </div>
      )}
    </AsyncCard>
  );
}
