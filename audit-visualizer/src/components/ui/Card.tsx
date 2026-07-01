import type { ReactNode } from "react";

type CardProps = {
  title: string;
  description?: string;
  accent?: [string, string];
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function Card({
  title,
  description,
  accent = ["#818cf8", "#4f46e5"],
  icon,
  action,
  className = "",
  children,
}: CardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 transition-shadow hover:shadow-xl ${className}`}
    >
      <span
        className="absolute inset-y-0 left-0 w-1.5"
        style={{
          background: `linear-gradient(to bottom, ${accent[0]}, ${accent[1]})`,
        }}
      />
      <div className="p-5 pl-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {icon && (
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg text-white shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})`,
                }}
              >
                {icon}
              </span>
            )}
            <div>
              <h3 className="text-base font-bold leading-tight text-slate-800">
                {title}
              </h3>
              {description && (
                <p className="mt-0.5 text-xs text-slate-500">{description}</p>
              )}
            </div>
          </div>
          {action}
        </div>
        {children}
      </div>
    </div>
  );
}
