export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 w-full bg-muted" />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />

        <div className="mt-auto flex gap-2">
          <div className="h-9 flex-1 rounded-xl bg-muted" />
          <div className="h-9 w-9 rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}
