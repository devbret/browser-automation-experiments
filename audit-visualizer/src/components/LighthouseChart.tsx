import * as d3 from "d3";
import { useEffect, useRef } from "react";
import type { LighthouseReport } from "../types/lighthouseTypes";

type Props = {
  data: LighthouseReport;
};

export const LighthouseChart = ({ data }: Props) => {
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

    const scores = Object.entries(data.categories).map(([key, value]) => ({
      category: key,
      score: (value as { score: number }).score * 100,
    }));

    const x = d3
      .scaleBand()
      .domain(scores.map((d) => d.category))
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    container
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    container.append("g").call(d3.axisLeft(y));

    container
      .selectAll("rect")
      .data(scores)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.category)!)
      .attr("y", (d) => y(d.score))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.score))
      .attr("fill", "seagreen");

    container
      .selectAll("text.score-label")
      .data(scores)
      .enter()
      .append("text")
      .attr("class", "score-label")
      .text((d) => `${d.score.toFixed(0)}%`)
      .attr("x", (d) => x(d.category)! + x.bandwidth() / 2)
      .attr("y", (d) => y(d.score) - 8)
      .attr("text-anchor", "middle")
      .style("font-size", "12px");
  }, [data]);

  return <svg ref={ref}></svg>;
};
