export default function CreatorProfileSkeleton() {
  return (
    <div className="max-w-[1160px] mx-auto px-4 min-[920px]:px-6 py-7">
      {/* Back breadcrumb skeleton */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-4 w-12 rounded bg-[--warm] animate-pulse" />
        <div className="w-px h-5 bg-black/8" />
        <div className="h-4 w-28 rounded bg-[--warm] animate-pulse" />
      </div>

      <div className="grid grid-cols-1 min-[920px]:grid-cols-[340px_1fr] gap-6">
        {/* Sidebar skeleton */}
        <div className="flex flex-col gap-3.5">
          {/* Profile card */}
          <div className="bg-white border border-black/8 rounded-[20px] overflow-hidden">
            <div className="h-[100px] bg-[--warm] animate-pulse" />
            <div className="pt-10 px-5 pb-5">
              <div className="h-5 w-32 rounded bg-[--warm] animate-pulse mb-2" />
              <div className="h-3.5 w-44 rounded bg-[--warm] animate-pulse mb-4" />
              <div className="space-y-2 mb-4">
                <div className="h-3 w-full rounded bg-[--warm] animate-pulse" />
                <div className="h-3 w-3/4 rounded bg-[--warm] animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-[--warm] animate-pulse" />
              </div>
              <div className="h-3 w-40 rounded bg-[--warm] animate-pulse mb-4" />
              <div className="flex gap-1.5 flex-wrap mb-5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-6 w-16 rounded-full bg-[--warm] animate-pulse" />
                ))}
              </div>
              <div className="h-11 w-full rounded-full bg-[--warm] animate-pulse mb-2" />
              <div className="flex gap-2">
                <div className="h-10 flex-1 rounded-full bg-[--warm] animate-pulse" />
                <div className="h-10 flex-1 rounded-full bg-[--warm] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-white border border-black/8 rounded-[20px] p-5">
            <div className="h-3 w-24 rounded bg-[--warm] animate-pulse mb-4" />
            <div className="grid grid-cols-2 gap-px bg-black/8 rounded-xl overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white p-3.5">
                  <div className="h-7 w-14 rounded bg-[--warm] animate-pulse mb-1" />
                  <div className="h-2.5 w-16 rounded bg-[--warm] animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Insights card */}
          <div className="bg-white border border-black/8 rounded-[20px] p-5">
            <div className="h-3 w-28 rounded bg-[--warm] animate-pulse mb-3" />
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex justify-between py-2 border-b border-black/5 last:border-0">
                <div className="h-3 w-20 rounded bg-[--warm] animate-pulse" />
                <div className="h-3 w-24 rounded bg-[--warm] animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="flex flex-col gap-5">
          {/* Campaign fit */}
          <div className="bg-white border border-black/8 rounded-[20px] p-6">
            <div className="h-5 w-40 rounded bg-[--warm] animate-pulse mb-5" />
            <div className="flex flex-col min-[920px]:flex-row gap-8 mb-5">
              <div className="h-20 w-24 rounded bg-[--warm] animate-pulse shrink-0" />
              <div className="flex-1 space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-3 w-24 rounded bg-[--warm] animate-pulse shrink-0" />
                    <div className="h-1.5 flex-1 rounded-full bg-[--warm] animate-pulse" />
                    <div className="h-3 w-10 rounded bg-[--warm] animate-pulse shrink-0" />
                  </div>
                ))}
              </div>
            </div>
            <div className="h-16 w-full rounded-xl bg-[--warm] animate-pulse" />
          </div>

          {/* Recent content */}
          <div className="bg-white border border-black/8 rounded-[20px] p-6">
            <div className="h-5 w-32 rounded bg-[--warm] animate-pulse mb-5" />
            <div className="grid grid-cols-2 min-[560px]:grid-cols-3 gap-2.5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[9/16] rounded-[14px] bg-[--warm] animate-pulse" />
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white border border-black/8 rounded-[20px] p-6">
            <div className="h-5 w-32 rounded bg-[--warm] animate-pulse mb-4" />
            <div className="flex items-end gap-1.5 h-[120px]">
              {[60, 100, 40, 55, 35].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 justify-end h-full">
                  <div className="w-full rounded-t-md bg-[--warm] animate-pulse" style={{ height: `${h}%` }} />
                  <div className="h-2.5 w-8 rounded bg-[--warm] animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Contact strip */}
          <div className="h-24 rounded-[20px] bg-[--warm] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
