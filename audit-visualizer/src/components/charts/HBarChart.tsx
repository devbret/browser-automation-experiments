import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { ChartTooltip } from "../ui/ChartTooltip";
import { useChartTooltip } from "../../hooks/useChartTooltip";

export type HBarDatum = {
  label: string;
  value: number;
  color: string;
  tooltip?: string;
};

type Props = {
  data: HBarDatum[];
  rowHeight?: number;
  format?: (v: number) => string;
  labelWidth?: number;
};

const WIDTH = 480;

export function HBarChart({
  data,
  rowHeight = 26,
  format = (v) => String(v),
  labelWidth = 150,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { tip, setTip } = useChartTooltip();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 6, right: 44, bottom: 6, left: labelWidth };
    const height = margin.top + margin.bottom + data.length * rowHeight;
    const w = WIDTH - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg
      .attr("viewBox", `0 0 ${WIDTH} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3
      .scaleBand<string>()
      .domain(data.map((d) => d.label))
      .range([0, h])
      .padding(0.22);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 1])
      .range([0, w]);

    g.append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .call((sel) => sel.select(".domain").remove())
      .selectAll("text")
      .attr("fill", "#475569")
      .style("font-size", "11px");

    const rows = g
      .selectAll("g.row")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "row")
      .style("cursor", "pointer")
      .on("mousemove", (event, d) => {
        const [px, py] = d3.pointer(event, wrapRef.current);
        setTip({
          x: px,
          y: py,
          content: (
            <span>
              <strong>{d.label}</strong>
              <br />
              {d.tooltip ?? format(d.value)}
            </span>
          ),
        });
      })
      .on("mouseleave", () => setTip(null));

    rows
      .append("rect")
      .attr("y", (d) => y(d.label)!)
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("rx", 4)
      .attr("fill", (d) => d.color)
      .attr("width", 0)
      .transition()
      .duration(750)
      .ease(d3.easeCubicOut)
      .delay((_, i) => i * 35)
      .attr("width", (d) => Math.max(2, x(d.value)));

    rows
      .append("text")
      .attr("y", (d) => y(d.label)! + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("x", (d) => Math.max(2, x(d.value)) + 6)
      .attr("fill", "#475569")
      .style("font-size", "11px")
      .style("font-weight", 600)
      .text((d) => format(d.value));
  }, [data, rowHeight, format, labelWidth, setTip]);

  return (
    <div ref={wrapRef} className="relative">
      <svg ref={svgRef} style={{ width: "100%", height: "auto" }} />
      <ChartTooltip tip={tip} />
    </div>
  );
}
