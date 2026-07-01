import { useJson } from "../../hooks/useJson";
import type { PayloadSize, WebVitals } from "../../types/audit";
import { StatCard } from "../ui/StatCard";
import { gradients } from "../../lib/theme";
import { formatBytes, formatMs, formatNumber } from "../../lib/format";

export function SummaryStats() {
  const vitals = useJson<WebVitals>("/data/web-vitals.json");
  const payload = useJson<PayloadSize>("/data/payload-size.json");

  const fcp = vitals.data?.find(
    (v) => v.name === "first-contentful-paint"
  )?.startTime;
  const fp = vitals.data?.find((v) => v.name === "first-paint")?.startTime;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard
        label="First Contentful Paint"
        value={fcp !== undefined ? formatMs(fcp) : "-"}
        sub="Time to first content"
        icon="🎨"
        gradient={gradients.vitals}
      />
      <StatCard
        label="First Paint"
        value={fp !== undefined ? formatMs(fp) : "-"}
        sub="First pixels rendered"
        icon="🖌️"
        gradient={gradients.a11y}
      />
      <StatCard
        label="Transfer Size"
        value={payload.data ? formatBytes(payload.data.totalBytes) : "-"}
        sub="Total bytes downloaded"
        icon="📦"
        gradient={gradients.payload}
      />
      <StatCard
        label="Requests"
        value={payload.data ? formatNumber(payload.data.responseCount) : "-"}
        sub="Network responses"
        icon="🔗"
        gradient={gradients.perf}
      />
    </div>
  );
}
