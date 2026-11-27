import { performanceSectionTabs, type PerformanceSectionTab } from "@/features/performances/performances";

type Props = {
    value: PerformanceSectionTab;
    onChange: (tab: PerformanceSectionTab) => void;
}

export function PerformanceSectionTabs({ value, onChange }: Props) {
    return (
        <div className="flex gap-1 overflow-x-auto border-b border-line" role="tablist" aria-label="Configuración del SKU de línea">
            {performanceSectionTabs.map(item => (
                <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={value === item.id}
                    className="-mb-px min-h-11 cursor-pointer whitespace-nowrap border-b-2 border-transparent px-4 text-sm font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink aria-selected:border-ink aria-selected:font-semibold aria-selected:text-ink"
                    onClick={() => onChange(item.id)}
                >
                    {item.label}
                </button>
            ))}
        </div>
    )
}
