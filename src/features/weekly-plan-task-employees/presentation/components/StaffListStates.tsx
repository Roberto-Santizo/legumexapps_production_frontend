type EmptyProps = {
    title: string;
    description: string;
}

export function StaffListLoading() {
    return (
        <div className="divide-y divide-line">
            {[0, 1, 2].map((index) => (
                <div key={index} className="flex animate-pulse items-center gap-3 px-5 py-4 motion-reduce:animate-none">
                    <span className="h-6 w-24 shrink-0 rounded-md bg-canvas" />

                    <div className="flex-1 space-y-2">
                        <span className="block h-2.5 w-1/3 rounded-full bg-canvas" />
                        <span className="block h-2 w-16 rounded-full bg-canvas" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export function StaffListEmpty({ title, description }: EmptyProps) {
    return (
        <div className="px-5 py-10 text-center">
            <p className="text-sm font-medium text-ink">{title}</p>
            <p className="mt-1 text-sm text-ink-muted">{description}</p>
        </div>
    )
}

export function StaffListError({ message }: { message: string }) {
    return <p className="px-5 py-10 text-center text-sm text-ink-muted">{message}</p>
}
