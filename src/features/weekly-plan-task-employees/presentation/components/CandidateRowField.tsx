import type { ReactNode } from "react";

type Props = {
    htmlFor: string;
    label: string;
    icon?: ReactNode;
    children: ReactNode;
}

export function CandidateRowField({ htmlFor, label, icon, children }: Props) {
    return (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:pl-[160px]">
            <label htmlFor={htmlFor} className="flex w-20 shrink-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                {icon}
                {label}
            </label>

            <div className="min-w-0 flex-1">{children}</div>
        </div>
    )
}
