import { useJson } from "../../hooks/useJson";
import type { JsErrors } from "../../types/audit";
import { AsyncCard } from "../ui/AsyncCard";

export function JsErrorsPanel() {
  const state = useJson<JsErrors>("/data/js-errors.json");

  return (
    <AsyncCard
      state={state}
      title="JavaScript Errors"
      description="Uncaught runtime errors thrown during page load"
      accent={["#f87171", "#dc2626"]}
      icon="🐛"
      isEmpty={(d) => d.length === 0}
      emptyIcon="🎉"
      emptyMessage="No JavaScript errors - clean run!"
    >
      {(data) => (
        <ul className="space-y-2">
          {data.map((err, i) => (
            <li
              key={i}
              className="flex gap-2 rounded-lg border border-rose-100 bg-rose-50 px-3 py-2"
            >
              <span className="mt-0.5 text-rose-400">⚠️</span>
              <code className="break-words font-mono text-xs text-rose-700">
                {err.message}
              </code>
            </li>
          ))}
        </ul>
      )}
    </AsyncCard>
  );
}
