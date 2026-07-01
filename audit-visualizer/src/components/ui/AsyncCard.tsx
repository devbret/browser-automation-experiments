import type { ReactNode } from "react";
import { Card } from "./Card";
import { EmptyState } from "./EmptyState";

type JsonState<T> = { data: T | null; error: string | null };

type AsyncCardProps<T> = {
  state: JsonState<T>;
  title: string;
  description?: string;
  accent?: [string, string];
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  isEmpty?: (data: T) => boolean;
  emptyMessage?: string;
  emptyIcon?: string;
  children: (data: T) => ReactNode;
};

export function AsyncCard<T>({
  state,
  title,
  description,
  accent,
  icon,
  action,
  className,
  isEmpty,
  emptyMessage = "No data.",
  emptyIcon,
  children,
}: AsyncCardProps<T>) {
  let body: ReactNode;
  if (state.error) {
    body = (
      <p className="rounded-lg bg-rose-50 px-3 py-6 text-center text-sm font-medium text-rose-600">
        Failed to load: {state.error}
      </p>
    );
  } else if (state.data === null) {
    body = (
      <div className="animate-pulse space-y-3 py-4">
        <div className="h-3 w-2/3 rounded bg-slate-100" />
        <div className="h-32 rounded-xl bg-slate-100" />
      </div>
    );
  } else if (isEmpty?.(state.data)) {
    body = <EmptyState icon={emptyIcon} message={emptyMessage} />;
  } else {
    body = children(state.data);
  }

  return (
    <Card
      title={title}
      description={description}
      accent={accent}
      icon={icon}
      action={action}
      className={className}
    >
      {body}
    </Card>
  );
}
