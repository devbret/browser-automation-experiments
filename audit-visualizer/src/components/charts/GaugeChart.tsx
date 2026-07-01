import * as d3 from "d3";
import { useEffect, useRef } from "react";

type Props = {
  value: number;
  color: string;
  label?: string;
  size?: number;
};

export function GaugeChart({ value, color, label, size = 168 }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const radius = size / 2;
    const thickness = size * 0.12;
    const clamped = Math.max(0, Math.min(100, value));

    const g = svg
      .attr("viewBox", `0 0 ${size} ${size}`)
      .append("g")
      .attr("transform", `translate(${radius},${radius})`);

    const arc = d3
      .arc<{ endAngle: number }>()
      .innerRadius(radius - thickness)
      .outerRadius(radius)
      .cornerRadius(thickness / 2)
      .startAngle(0)
      .endAngle((d) => d.endAngle);

    g.append("path")
      .attr("d", arc({ endAngle: 2 * Math.PI }))
      .attr("fill", "#eef2f7");

    const target = (clamped / 100) * 2 * Math.PI;
    g.append("path")
      .attr("fill", color)
      .transition()
      .duration(900)
      .ease(d3.easeCubicOut)
      .attrTween("d", () => {
        const i = d3.interpolate(0, target);
        return (t) => arc({ endAngle: i(t) }) as string;
      });

    const number = g
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.12em")
      .attr("font-size", size * 0.3)
      .attr("font-weight", 800)
      .attr("fill", "#1e293b")
      .text("0");

    number
      .transition()
      .duration(900)
      .ease(d3.easeCubicOut)
      .tween("text", function () {
        const node = this as SVGTextElement;
        const i = d3.interpolateNumber(0, Math.round(clamped));
        return (t) => {
          node.textContent = String(Math.round(i(t)));
        };
      });

    if (label) {
      g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", size * 0.26)
        .attr("font-size", size * 0.1)
        .attr("font-weight", 600)
        .attr("fill", "#64748b")
        .text(label);
    }
  }, [value, color, label, size]);

  return (
    <svg
      ref={ref}
      role="img"
      style={{ width: "100%", height: "auto", maxWidth: size }}
    />
  );
}
