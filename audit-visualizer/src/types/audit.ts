export type Meta = {
  url: string;
  timestamp: string;
};

export type LighthouseScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

export type PerformanceTiming = Record<string, number>;

export type WebVital = {
  name: string;
  startTime: number;
};
export type WebVitals = WebVital[];

export type PayloadSize = {
  totalBytes: number;
  totalKB: number;
  totalMB: number;
  responseCount: number;
};

export type ImpactLevel = "minor" | "moderate" | "serious" | "critical";

export type AxeNode = {
  target: string[];
  html: string;
  failureSummary?: string;
};

export type AxeViolation = {
  id: string;
  impact: ImpactLevel | null;
  help: string;
  description: string;
  tags: string[];
  nodes: AxeNode[];
};

export type AccessibilityReport = {
  violations: AxeViolation[];
  passes?: { id: string }[];
  incomplete?: { id: string }[];
};

export type LinkStatus = {
  link: string;
  status: number | "error";
  message?: string;
};
export type LinkStatusReport = LinkStatus[];

export type ThirdPartyRequests = Record<string, number>;

export type ConsoleMessage = {
  type: string;
  text: string;
};
export type ConsoleMessages = ConsoleMessage[];

export type JsError = { message: string };
export type JsErrors = JsError[];

export type CoverageRange = { start: number; end: number };
export type CoverageEntry = {
  url: string;
  text: string;
  ranges: CoverageRange[];
};
export type CoverageReport = CoverageEntry[];

export type SeoMeta = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
};

export type Cookie = {
  name: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: string;
  [key: string]: unknown;
};
export type Cookies = Cookie[];

export type StorageDump = Record<string, string>;
