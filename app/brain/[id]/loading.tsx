export default function BrainLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f4ee] lg:flex-row">
      <div className="w-full shrink-0 border-b border-sage/20 bg-white/60 p-6 lg:w-[280px] lg:border-b-0 lg:border-r">
        <div className="mb-6 flex items-center gap-2.5">
          <div className="h-8 w-8 animate-pulse rounded-[9px] bg-sage/30" />
          <div className="h-4 w-24 animate-pulse rounded-lg bg-sage/20" />
        </div>
        <div className="mb-4 h-28 animate-pulse rounded-2xl bg-sage/15" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 animate-pulse rounded-xl bg-sage/10" />
          ))}
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="mb-4 flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-28 animate-pulse rounded-full bg-sage/15" />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-2xl bg-sage/10" />
      </div>
    </div>
  );
}
