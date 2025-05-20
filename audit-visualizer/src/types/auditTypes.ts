export type PerformanceTiming = {
  connectStart: number;
  secureConnectionStart: number;
  unloadEventEnd: number;
  domainLookupStart: number;
  domainLookupEnd: number;
  responseStart: number;
  connectEnd: number;
  responseEnd: number;
  requestStart: number;
  domLoading: number;
  redirectStart: number;
  loadEventEnd: number;
  domComplete: number;
  navigationStart: number;
  loadEventStart: number;
  domContentLoadedEventEnd: number;
  unloadEventStart: number;
  redirectEnd: number;
  domInteractive: number;
  fetchStart: number;
  domContentLoadedEventStart: number;
};

export type LighthouseScores = {
  performance: number;
  accessibility: number;
  seo: number;
  bestPractices: number;
};
