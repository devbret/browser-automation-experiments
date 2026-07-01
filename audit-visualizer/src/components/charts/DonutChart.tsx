import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { ChartTooltip } from "../ui/ChartTooltip";
import { useChartTooltip } from "../../hooks/useChartTooltip";

export type DonutDatum = { label: string; value: number; color: string };

type Props = {
  data: DonutDatum[];
  centerValue?: string | number;
  centerLabel?: string;
  size?: number;
};

export function DonutChart({
  data,
  centerValue,
  centerLabel,
  size = 200,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { tip, setTip } = useChartTooltip();

  const total = data.reduce((s, d) => s + d.value, 0);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const radius = size / 2;
    const g = svg
      .attr("viewBox", `0 0 ${size} ${size}`)
      .append("g")
      .attr("transform", `translate(${radius},${radius})`);

    const pie = d3
      .pie<DonutDatum>()
      .value((d) => d.value)
      .sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<DonutDatum>>()
      .innerRadius(radius * 0.62)
      .outerRadius(radius)
      .cornerRadius(2)
      .padAngle(0.02);

    g.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("fill", (d) => d.data.color)
      .style("cursor", "pointer")
      .on("mousemove", (event, d) => {
        const [px, py] = d3.pointer(event, wrapRef.current);
        const pct = total > 0 ? Math.round((d.data.value / total) * 100) : 0;
        setTip({
          x: px,
          y: py,
          content: (
            <span>
              <strong>{d.data.label}</strong>: {d.data.value} ({pct}%)
            </span>
          ),
        });
      })
      .on("mouseleave", () => setTip(null))
      .transition()
      .duration(800)
      .ease(d3.easeCubicOut)
      .attrTween("d", function (d) {
        const i = d3.interpolate({ startAngle: d.startAngle, endAngle: d.startAngle }, d);
        return (t) => arc(i(t)) as string;
      });

    if (centerValue !== undefined) {
      g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", centerLabel ? "-0.05em" : "0.35em")
        .attr("font-size", size * 0.22)
        .attr("font-weight", 800)
        .attr("fill", "#1e293b")
        .text(String(centerValue));
    }
    if (centerLabel) {
      g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", size * 0.14)
        .attr("font-size", size * 0.075)
        .attr("font-weight", 600)
        .attr("fill", "#94a3b8")
        .text(centerLabel);
    }
  }, [data, centerValue, centerLabel, size, total, setTip]);

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-5">
      <div ref={wrapRef} className="relative shrink-0" style={{ width: size }}>
        <svg ref={svgRef} style={{ width: "100%", height: "auto" }} />
        <ChartTooltip tip={tip} />
      </div>
      <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-1">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-slate-600">{d.label}</span>
            <span className="ml-auto font-semibold tabular-nums text-slate-800">
              {d.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
