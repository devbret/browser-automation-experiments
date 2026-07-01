import { useState, type ReactNode } from "react";

export type Tip = { x: number; y: number; content: ReactNode } | null;

export function useChartTooltip() {
  const [tip, setTip] = useState<Tip>(null);
  return { tip, setTip };
}
