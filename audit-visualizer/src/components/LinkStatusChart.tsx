import * as d3 from "d3";
import { useEffect, useRef } from "react";
import type { LinkStatusReport } from "../types/linkStatusTypes";

type Props = {
  data: LinkStatusReport;
};

export const LinkStatusChart = ({ data }: Props) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || !ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const container = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Count link statuses
    const statusCounts = d3.rollup(
      data,
      (entries) => entries.length,
      (entry) => String(entry.status)
    );

    const statusData = Array.from(statusCounts, ([status, count]) => ({
      status,
      count,
    }));

    const x = d3
      .scaleBand()
      .domain(statusData.map((d) => d.status))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(statusData, (d) => d.count)!])
      .range([height, 0]);

    container
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    container.append("g").call(d3.axisLeft(y));

    container
      .selectAll("rect")
      .data(statusData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.status)!)
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", (d) =>
        d.status === "200"
          ? "seagreen"
          : d.status === "error"
          ? "crimson"
          : "orange"
      );
  }, [data]);

  return <svg ref={ref}></svg>;
};
