import { useMemo, useState, type ReactNode } from "react";

export type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  align?: "left" | "right" | "center";
  headerClassName?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string | number;
  filterText?: (row: T) => string;
  filterPlaceholder?: string;
  initialSort?: { key: string; dir: "asc" | "desc" };
  pageSize?: number;
};

const alignClass: Record<string, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  filterText,
  filterPlaceholder = "Filter…",
  initialSort,
  pageSize = 8,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(
    initialSort ?? null
  );
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    if (!filterText || !query.trim()) return rows;
    const q = query.trim().toLowerCase();
    return rows.filter((r) => filterText(r).toLowerCase().includes(q));
  }, [rows, query, filterText]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortValue) return filtered;
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }, [filtered, sort, columns]);

  const visible = expanded ? sorted : sorted.slice(0, pageSize);

  const toggleSort = (key: string) =>
    setSort((prev) =>
      prev?.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );

  return (
    <div>
      {filterText && (
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setExpanded(false);
          }}
          placeholder={filterPlaceholder}
          className="mb-3 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
              {columns.map((col) => {
                const active = sort?.key === col.key;
                return (
                  <th
                    key={col.key}
                    className={`px-2 py-2 font-semibold ${
                      alignClass[col.align ?? "left"]
                    } ${col.sortValue ? "cursor-pointer select-none hover:text-slate-600" : ""} ${
                      col.headerClassName ?? ""
                    }`}
                    onClick={col.sortValue ? () => toggleSort(col.key) : undefined}
                  >
                    {col.header}
                    {col.sortValue && (
                      <span className="ml-1 text-slate-300">
                        {active ? (sort!.dir === "asc" ? "▲" : "▼") : "⇅"}
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, i) => (
              <tr
                key={rowKey(row, i)}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-2 py-2 text-slate-700 ${
                      alignClass[col.align ?? "left"]
                    }`}
                  >
                    {col.render ? col.render(row) : null}
                  </td>
                ))}
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-2 py-6 text-center text-sm text-slate-400"
                >
                  No matching rows.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {sorted.length > pageSize && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
        >
          {expanded ? "Show less" : `Show all ${sorted.length}`}
        </button>
      )}
    </div>
  );
}
