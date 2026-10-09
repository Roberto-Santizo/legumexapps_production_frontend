export function PerformanceRecordsSkeleton() {
    return (
        <div className="space-y-px overflow-hidden rounded-xl border border-line bg-surface">
            {[0, 1, 2].map(index => (
                <div key={index} className="flex animate-pulse gap-6 px-5 py-4 motion-reduce:animate-none">
                    <span className="h-2.5 w-10 rounded-full bg-canvas" />
                    <span className="h-2.5 flex-1 rounded-full bg-canvas" />
                </div>
            ))}
        </div>
    )
}
