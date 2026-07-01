export const palette = {
  perf: "#10b981",
  a11y: "#3b82f6",
  best: "#8b5cf6",
  seo: "#f59e0b",
  vitals: "#06b6d4",
  payload: "#f43f5e",
  thirdParty: "#d946ef",
  links: "#14b8a6",
  js: "#eab308",
  css: "#0ea5e9",
  console: "#6366f1",
  errors: "#ef4444",
  seoPanel: "#ec4899",
  storage: "#84cc16",
};

export const gradients: Record<string, [string, string]> = {
  perf: ["#34d399", "#059669"],
  a11y: ["#60a5fa", "#2563eb"],
  best: ["#a78bfa", "#7c3aed"],
  seo: ["#fbbf24", "#d97706"],
  vitals: ["#22d3ee", "#0891b2"],
  payload: ["#fb7185", "#e11d48"],
  thirdParty: ["#e879f9", "#c026d3"],
  links: ["#2dd4bf", "#0d9488"],
  js: ["#facc15", "#ca8a04"],
  css: ["#38bdf8", "#0284c7"],
  console: ["#818cf8", "#4f46e5"],
  errors: ["#f87171", "#dc2626"],
  hero: ["#6366f1", "#d946ef"],
};

export const impactOrder = ["minor", "moderate", "serious", "critical"] as const;
export const impactColors: Record<string, string> = {
  minor: "#facc15",
  moderate: "#fb923c",
  serious: "#f43f5e",
  critical: "#b91c1c",
  unknown: "#94a3b8",
};

export function statusColor(status: number | string): string {
  if (status === "error") return "#b91c1c";
  const code = Number(status);
  if (code >= 200 && code < 300) return "#10b981";
  if (code >= 300 && code < 400) return "#f59e0b";
  if (code >= 400 && code < 500) return "#f43f5e";
  if (code >= 500) return "#b91c1c";
  return "#94a3b8";
}

export function scoreColor(score: number): string {
  if (score >= 90) return "#10b981";
  if (score >= 50) return "#f59e0b";
  return "#f43f5e";
}

export function consoleTypeColor(type: string): string {
  switch (type) {
    case "error":
      return "#ef4444";
    case "warning":
      return "#f59e0b";
    case "info":
      return "#3b82f6";
    case "debug":
      return "#8b5cf6";
    default:
      return "#6366f1";
  }
}
