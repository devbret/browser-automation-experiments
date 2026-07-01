import { useJson } from "../../hooks/useJson";
import type { Cookie, Cookies, StorageDump } from "../../types/audit";
import { Card } from "../ui/Card";
import { DataTable, type Column } from "../ui/DataTable";
import { Badge } from "../ui/Badge";
import { EmptyState } from "../ui/EmptyState";

const columns: Column<Cookie>[] = [
  {
    key: "name",
    header: "Name",
    sortValue: (r) => r.name,
    render: (r) => (
      <span className="font-mono text-xs font-semibold text-slate-700">
        {r.name}
      </span>
    ),
  },
  {
    key: "domain",
    header: "Domain",
    sortValue: (r) => r.domain ?? "",
    render: (r) => <span className="text-xs text-slate-500">{r.domain}</span>,
  },
  {
    key: "flags",
    header: "Flags",
    render: (r) => (
      <div className="flex flex-wrap gap-1">
        {r.secure && <Badge color="#10b981">Secure</Badge>}
        {r.httpOnly && <Badge color="#3b82f6">HttpOnly</Badge>}
        {r.sameSite && <Badge color="#8b5cf6">SameSite={String(r.sameSite)}</Badge>}
      </div>
    ),
  },
];

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2 text-center">
      <p className="text-xl font-extrabold tabular-nums text-slate-800">
        {value}
      </p>
      <p className="text-[11px] font-medium text-slate-500">{label}</p>
    </div>
  );
}

export function StoragePanel() {
  const cookies = useJson<Cookies>("/data/cookies.json");
  const local = useJson<StorageDump>("/data/local-storage.json");
  const session = useJson<StorageDump>("/data/session-storage.json");
  const error = cookies.error || local.error || session.error;
  const loading =
    cookies.data === null || local.data === null || session.data === null;

  return (
    <Card
      title="Cookies & Storage"
      description="Client-side state set on the page"
      accent={["#a3e635", "#65a30d"]}
      icon="🍪"
    >
      {error ? (
        <p className="rounded-lg bg-rose-50 px-3 py-6 text-center text-sm font-medium text-rose-600">
          Failed to load: {error}
        </p>
      ) : loading ? (
        <div className="h-32 animate-pulse rounded-xl bg-slate-100" />
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Stat label="Cookies" value={cookies.data!.length} />
            <Stat label="localStorage" value={Object.keys(local.data!).length} />
            <Stat
              label="sessionStorage"
              value={Object.keys(session.data!).length}
            />
          </div>
          {cookies.data!.length > 0 ? (
            <DataTable
              columns={columns}
              rows={cookies.data!}
              rowKey={(r, i) => `${r.name}-${i}`}
              filterText={(r) => `${r.name} ${r.domain ?? ""}`}
              filterPlaceholder="Filter cookies…"
              pageSize={6}
            />
          ) : (
            <EmptyState icon="🔒" message="No cookies were set." />
          )}
        </div>
      )}
    </Card>
  );
}
