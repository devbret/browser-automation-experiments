export type LighthouseCategory =
  | "performance"
  | "accessibility"
  | "best-practices"
  | "seo"
  | "pwa";

export type LighthouseReport = {
  categories: {
    [key in LighthouseCategory]: {
      score: number;
    };
  };
};
