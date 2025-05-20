import * as d3 from "d3";
import { useEffect, useRef } from "react";
import type { ThirdPartyRequests } from "../types/thirdPartyTypes";

type Props = {
  data: ThirdPartyRequests;
};

export const ThirdPartyChart = ({ data }: Props) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || !ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 30, bottom: 60, left: 200 };
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const container = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const dataArray = Object.entries(data).map(([domain, count]) => ({
      domain,
      count,
    }));

    // Sort by count descending
    dataArray.sort((a, b) => b.count - a.count);

    const y = d3
      .scaleBand()
      .domain(dataArray.map((d) => d.domain))
      .range([0, height])
      .padding(0.2);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(dataArray, (d) => d.count)!])
      .range([0, width]);

    container.append("g").call(d3.axisLeft(y));
    container
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    container
      .selectAll("rect")
      .data(dataArray)
      .enter()
      .append("rect")
      .attr("y", (d) => y(d.domain)!)
      .attr("x", 0)
      .attr("height", y.bandwidth())
      .attr("width", (d) => x(d.count))
      .attr("fill", "#007acc");

    container
      .selectAll("text.label")
      .data(dataArray)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => x(d.count) + 5)
      .attr("y", (d) => y(d.domain)! + y.bandwidth() / 2 + 4)
      .text((d) => d.count.toString())
      .style("font-size", "12px");
  }, [data]);

  return <svg ref={ref}></svg>;
};
