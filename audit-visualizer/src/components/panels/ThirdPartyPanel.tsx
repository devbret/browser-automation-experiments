import { useJson } from "../../hooks/useJson";
import type { ThirdPartyRequests } from "../../types/audit";
import { AsyncCard } from "../ui/AsyncCard";
import { HBarChart, type HBarDatum } from "../charts/HBarChart";
import { gradients, palette } from "../../lib/theme";

export function ThirdPartyPanel() {
  const state = useJson<ThirdPartyRequests>("/data/third-party-requests.json");

  return (
    <AsyncCard
      state={state}
      title="Third-Party Requests"
      description="External domains ranked by number of requests"
      accent={gradients.thirdParty}
      icon="🌐"
      isEmpty={(d) => Object.keys(d).length === 0}
      emptyIcon="🔒"
      emptyMessage="No third-party requests - fully first-party!"
    >
      {(data) => {
        const bars: HBarDatum[] = Object.entries(data)
          .map(([label, value]) => ({
            label,
            value,
            color: palette.thirdParty,
          }))
          .sort((a, b) => b.value - a.value);
        return <HBarChart data={bars} labelWidth={168} />;
      }}
    </AsyncCard>
  );
}
