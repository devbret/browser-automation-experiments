import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { ChartTooltip } from "../ui/ChartTooltip";
import { useChartTooltip } from "../../hooks/useChartTooltip";

export type BarDatum = { label: string; value: number; color: string };

type Props = {
  data: BarDatum[];
  width?: number;
  height?: number;
  format?: (v: number) => string;
  rotateLabels?: boolean;
};

export function BarChart({
  data,
  width = 480,
  height = 260,
  format = (v) => String(v),
  rotateLabels = false,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { tip, setTip } = useChartTooltip();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 16, right: 16, bottom: rotateLabels ? 96 : 34, left: 44 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand<string>()
      .domain(data.map((d) => d.label))
      .range([0, w])
      .padding(0.25);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 1])
      .nice()
      .range([h, 0]);

    g.append("g")
      .attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call((sel) => sel.select(".domain").attr("stroke", "#cbd5e1"))
      .selectAll("text")
      .attr("fill", "#64748b")
      .style("font-size", rotateLabels ? "10px" : "11px")
      .attr("transform", rotateLabels ? "rotate(35)" : null)
      .attr("dx", rotateLabels ? "0.4em" : null)
      .attr("dy", rotateLabels ? "0.4em" : null)
      .style("text-anchor", rotateLabels ? "start" : "middle");

    g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickSize(-w))
      .call((sel) => sel.select(".domain").remove())
      .call((sel) =>
        sel.selectAll(".tick line").attr("stroke", "#eef2f7")
      )
      .selectAll("text")
      .attr("fill", "#94a3b8")
      .style("font-size", "10px");

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.label)!)
      .attr("width", x.bandwidth())
      .attr("rx", 5)
      .attr("fill", (d) => d.color)
      .attr("y", h)
      .attr("height", 0)
      .style("cursor", "pointer")
      .on("mousemove", (event, d) => {
        const [px, py] = d3.pointer(event, wrapRef.current);
        setTip({
          x: px,
          y: py,
          content: (
            <span>
              <strong>{d.label}</strong>: {format(d.value)}
            </span>
          ),
        });
      })
      .on("mouseleave", () => setTip(null))
      .transition()
      .duration(750)
      .ease(d3.easeCubicOut)
      .delay((_, i) => i * 40)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => h - y(d.value));
  }, [data, width, height, format, rotateLabels, setTip]);

  return (
    <div ref={wrapRef} className="relative">
      <svg ref={svgRef} style={{ width: "100%", height: "auto" }} />
      <ChartTooltip tip={tip} />
    </div>
  );
}
