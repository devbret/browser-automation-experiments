import type { CoverageEntry, CoverageReport } from "../types/audit";

export type CoverageRow = {
  url: string;
  total: number;
  used: number;
  unused: number;
  unusedPct: number;
};

export type CoverageSummary = {
  total: number;
  used: number;
  unused: number;
  unusedPct: number;
  rows: CoverageRow[];
};

function usedBytes(entry: CoverageEntry): number {
  return entry.ranges.reduce((sum, r) => sum + (r.end - r.start), 0);
}

export function summarizeCoverage(report: CoverageReport): CoverageSummary {
  const rows: CoverageRow[] = report.map((entry) => {
    const total = entry.text?.length ?? 0;
    const used = Math.min(usedBytes(entry), total);
    const unused = Math.max(total - used, 0);
    return {
      url: entry.url,
      total,
      used,
      unused,
      unusedPct: total > 0 ? unused / total : 0,
    };
  });

  const total = rows.reduce((s, r) => s + r.total, 0);
  const used = rows.reduce((s, r) => s + r.used, 0);
  const unused = Math.max(total - used, 0);

  return {
    total,
    used,
    unused,
    unusedPct: total > 0 ? unused / total : 0,
    rows: rows.sort((a, b) => b.unused - a.unused),
  };
}
