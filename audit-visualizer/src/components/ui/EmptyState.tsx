export function EmptyState({
  icon = "✨",
  message,
}: {
  icon?: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-50 py-10 text-center">
      <span className="text-3xl">{icon}</span>
      <p className="text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
}
