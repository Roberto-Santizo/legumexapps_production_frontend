import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
    tone?: 'outline' | 'muted' | 'solid';
    icon?: ReactNode;
    title?: string;
}

const tones = {
    outline: 'border border-line-strong bg-surface text-ink',
    muted: 'border border-transparent bg-canvas text-ink-muted',
    solid: 'border border-ink bg-ink text-white'
};

export function CaptureFieldTag({ children, tone = 'outline', icon, title }: Props) {
    return (
        <span
            title={title}
            className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] [&>svg]:size-3 ${tones[tone]}`}
        >
            {icon}
            {children}
        </span>
    )
}
