import "./App.css";
import { useEffect, useState } from "react";
import { PerformanceChart } from "./components/PerformanceChart";
import type { PerformanceTiming } from "./types/auditTypes";
import { AccessibilityChart } from "./components/AccessibilityChart";
import type { AccessibilityReport } from "./types/accessibilityTypes";
import { LighthouseChart } from "./components/LighthouseChart";
import type { LighthouseReport } from "./types/lighthouseTypes";
import { LinkStatusChart } from "./components/LinkStatusChart";
import type { LinkStatusReport } from "./types/linkStatusTypes";
import { ThirdPartyChart } from "./components/ThirdPartyChart";
import type { ThirdPartyRequests } from "./types/thirdPartyTypes";

function App() {
  const [accessibilityData, setAccessibilityData] =
    useState<AccessibilityReport | null>(null);
  const [lighthouseData, setLighthouseData] = useState<LighthouseReport | null>(
    null
  );
  const [linkStatusData, setLinkStatusData] = useState<LinkStatusReport | null>(
    null
  );
  const [data, setData] = useState<PerformanceTiming | null>(null);
  const [thirdPartyData, setThirdPartyData] =
    useState<ThirdPartyRequests | null>(null);

  useEffect(() => {
    fetch("/data/accessibility-report.json")
      .then((res) => res.json())
      .then(setAccessibilityData);
  }, []);

  useEffect(() => {
    fetch("/data/lighthouse-report.json")
      .then((res) => res.json())
      .then(setLighthouseData);
  }, []);

  useEffect(() => {
    fetch("/data/performance-timing.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  useEffect(() => {
    fetch("/data/link-statuses.json")
      .then((res) => res.json())
      .then(setLinkStatusData);
  }, []);

  useEffect(() => {
    fetch("/data/third-party-requests.json")
      .then((res) => res.json())
      .then(setThirdPartyData);
  }, []);

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Web Audit Visualizer</h1>
      </div>

      <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
        This tool transforms automated web audit data into interactive, readable
        charts. It visualizes performance metrics, accessibility issues,
        third-party requests, broken links and Lighthouse scores using D3.js.
        The data is collected using headless browser tools like Puppeteer and
        axe-core, then processed and displayed in real time. This tool helps
        developers quickly understand the health, structure and optimization
        opportunities of any website.
      </p>

      <div className="flex flex-wrap justify-center gap-1 px-4">
        <div className="p-4 w-full md:w-[48%] min-w-[300px]">
          <h2 className="text-xl font-semibold mb-2">
            Accessibility Violations
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Displays the number of detected issues grouped by impact level,
            helping you identify which problems are most critical to fix.
          </p>
          {accessibilityData ? (
            <AccessibilityChart data={accessibilityData} />
          ) : (
            <p>Loading accessibility report...</p>
          )}
        </div>

        <div className="p-4 w-full md:w-[48%] min-w-[300px]">
          <h2 className="text-xl font-semibold mb-2">
            Lighthouse Scores By Category
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Shows your site’s performance, accessibility, SEO and best practices
            as percentage scores based on a full Lighthouse audit.
          </p>
          {lighthouseData ? (
            <LighthouseChart data={lighthouseData} />
          ) : (
            <p>Loading Lighthouse report...</p>
          )}
        </div>

        <div className="p-4 w-full md:w-[48%] min-w-[300px]">
          <h2 className="text-xl font-semibold mb-2">Link Status Codes</h2>
          <p className="text-sm text-gray-600 mb-4">
            Categorizes all scanned links by their HTTP status, helping you
            quickly spot broken, redirected or inaccessible URLs.
          </p>
          {linkStatusData ? (
            <LinkStatusChart data={linkStatusData} />
          ) : (
            <p>Loading link status data...</p>
          )}
        </div>

        <div className="p-4 w-full md:w-[48%] min-w-[300px]">
          <h2 className="text-xl font-semibold mb-2">
            Third-Party Requests By Domain
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Shows how many network requests your site makes to each external
            domain, helping you identify performance bottlenecks and external
            dependencies.
          </p>
          {thirdPartyData ? (
            <ThirdPartyChart data={thirdPartyData} />
          ) : (
            <p>Loading third-party request data...</p>
          )}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">Performance Metrics</h2>
        <p className="text-sm text-gray-600 mb-4">
          Visualizes key browser timing events relative to{" "}
          <code>connectStart</code>, giving you insight into how long each part
          of the page load process takes.
        </p>
        {data ? <PerformanceChart data={data} /> : <p>Loading...</p>}
      </div>
    </>
  );
}

export default App;
