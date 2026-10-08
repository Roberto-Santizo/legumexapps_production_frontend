export function StoppedLineTag() {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#a3402f]/8 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a3402f] ring-1 ring-inset ring-[#a3402f]/20">
            <span className="relative flex size-1.5" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#a3402f] opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#a3402f]" />
            </span>
            Línea detenida
        </span>
    )
}
