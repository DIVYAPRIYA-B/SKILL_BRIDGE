import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'Loading...', full = false }: { message?: string; full?: boolean }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader2 className="w-7 h-7 text-brand-500 animate-spin" />
      <p className="text-sm text-ink-500">{message}</p>
    </div>
  );
  if (full) return <div className="min-h-[60vh] flex items-center justify-center">{content}</div>;
  return content;
}

export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-3">
      <div className="skeleton h-4 w-1/3" />
      <div className="skeleton h-3 w-2/3" />
      <div className="skeleton h-3 w-1/2" />
      <div className="flex gap-2 pt-2">
        <div className="skeleton h-8 w-20" />
        <div className="skeleton h-8 w-20" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}
