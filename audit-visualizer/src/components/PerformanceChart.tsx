import * as d3 from "d3";
import { useEffect, useRef } from "react";
import type { PerformanceTiming } from "../types/auditTypes";

type Props = {
  data: PerformanceTiming;
};

export const PerformanceChart = ({ data }: Props) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || !ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 60, right: 30, bottom: 100, left: 100 };
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const container = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const connectStart = data.connectStart;

    const metrics = Object.entries(data)
      .filter(
        ([key, value]) =>
          key !== "connectStart" && value > 0 && connectStart !== undefined
      )
      .map(([key, value]) => [key, value - connectStart] as [string, number]);

    const x = d3
      .scaleBand()
      .domain(metrics.map(([key]) => key))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(metrics, ([, value]) => value)!])
      .range([height, 0]);

    // X Axis
    container
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start")
      .style("font-size", "12px");

    // Y Axis
    container
      .append("g")
      .call(d3.axisLeft(y).ticks(10))
      .selectAll("text")
      .style("font-size", "12px");

    // Bars
    container
      .selectAll("rect")
      .data(metrics)
      .enter()
      .append("rect")
      .attr("x", ([key]) => x(key)!)
      .attr("y", ([, value]) => y(value))
      .attr("width", x.bandwidth())
      .attr("height", ([, value]) => height - y(value))
      .attr("fill", "steelblue");

    // Labels on bars
    container
      .selectAll("text.bar-label")
      .data(metrics)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .text(([, value]) => value.toString())
      .attr("x", ([key]) => x(key)! + x.bandwidth() / 2)
      .attr("y", ([, value]) => y(value) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#333");
  }, [data]);

  return <svg ref={ref}></svg>;
};
