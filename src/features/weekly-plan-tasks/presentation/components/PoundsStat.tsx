import { formatNumber } from "@/features/shared/shared";

type Props = {
    label: string;
    pounds: number | null;
}

export function PoundsStat({ label, pounds }: Props) {
    return (
        <div className="flex items-baseline justify-between gap-3 px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">{label}</p>
            <p className={`font-mono text-lg ${pounds !== null ? 'text-ink' : 'text-ink-subtle'}`}>
                {pounds !== null ? formatNumber(pounds) : 'Sin registrar'}
            </p>
        </div>
    )
}
