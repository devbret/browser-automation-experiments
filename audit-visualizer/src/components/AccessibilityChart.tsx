import * as d3 from "d3";
import { useEffect, useRef } from "react";
import type { AccessibilityReport } from "../types/accessibilityTypes";

type Props = {
  data: AccessibilityReport;
};

export const AccessibilityChart = ({ data }: Props) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || !ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const container = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Count violations by impact level
    const impactLevels = ["minor", "moderate", "serious", "critical"] as const;
    type ImpactLevel = (typeof impactLevels)[number];

    const impactCounts = d3.rollup(
      data.violations,
      (v) => v.length,
      (d) =>
        impactLevels.includes(d.impact as ImpactLevel)
          ? (d.impact as ImpactLevel)
          : "unknown"
    );

    const impactData = impactLevels.map((impact) => ({
      impact,
      count: impactCounts.get(impact) || 0,
    }));

    const x = d3
      .scaleBand()
      .domain(impactData.map((d) => d.impact))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(impactData, (d) => d.count)!])
      .range([height, 0]);

    container
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    container.append("g").call(d3.axisLeft(y));

    container
      .selectAll("rect")
      .data(impactData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.impact)!)
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", "indianred");
  }, [data]);

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
};
