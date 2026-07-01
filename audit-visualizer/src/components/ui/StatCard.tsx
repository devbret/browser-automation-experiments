import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  icon?: ReactNode;
  gradient: [string, string];
};

export function StatCard({ label, value, sub, icon, gradient }: StatCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-4 text-white shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
      }}
    >
      <div className="absolute -right-4 -top-6 text-6xl opacity-20">{icon}</div>
      <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
        {label}
      </p>
      <p className="mt-1 text-2xl font-extrabold tabular-nums leading-none">
        {value}
      </p>
      {sub && <p className="mt-1 text-xs font-medium text-white/85">{sub}</p>}
    </div>
  );
}
