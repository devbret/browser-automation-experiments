export type AxeResult = {
  id: string;
  impact: "minor" | "moderate" | "serious" | "critical";
  description: string;
  nodes: {
    html: string;
    target: string[];
    failureSummary?: string;
  }[];
};

export type AccessibilityReport = {
  violations: AxeResult[];
};
