type Props = {
    message: string;
    status: number;
};

const classes: Record<number, string> = {
    1: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200',
    2: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200',
    3: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
    4: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
    5: 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200',
};

export function StatusMessageComponent({ message, status }: Props) {
    const color = classes[status] ?? classes[5];

    return (
        <span
            className={`
                inline-flex items-center
                rounded-full
                px-3 py-1
                text-xs font-medium
                tracking-wide
                ${color}
            `}
        >
            {message}
        </span>
    );
}