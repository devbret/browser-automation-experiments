import { useJson } from "../../hooks/useJson";
import type { SeoMeta } from "../../types/audit";
import { AsyncCard } from "../ui/AsyncCard";
import { Badge } from "../ui/Badge";

const FIELDS: [keyof SeoMeta, string][] = [
  ["title", "Title"],
  ["description", "Description"],
  ["canonical", "Canonical URL"],
  ["robots", "Robots"],
];

export function SeoPanel() {
  const state = useJson<SeoMeta>("/data/seo-meta.json");

  return (
    <AsyncCard
      state={state}
      title="SEO Metadata"
      description="Key tags search engines rely on"
      accent={["#f472b6", "#db2777"]}
      icon="🔍"
    >
      {(data) => (
        <dl className="divide-y divide-slate-100">
          {FIELDS.map(([key, label]) => {
            const value = data[key];
            return (
              <div key={key} className="flex gap-3 py-2.5">
                <dt className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {label}
                </dt>
                <dd className="min-w-0 flex-1 text-sm">
                  {value ? (
                    <span className="break-words text-slate-700">{value}</span>
                  ) : (
                    <Badge color="#f59e0b">Missing</Badge>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      )}
    </AsyncCard>
  );
}
