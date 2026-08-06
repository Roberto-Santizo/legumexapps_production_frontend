const LOGO_URL = "https://legumexappsapi-storage.s3.us-east-1.amazonaws.com/resources/LOGO_LX_V2.png";

type Props = {
    label?: string;
    fullScreen?: boolean;
}

export function Loading({ label = "Cargando", fullScreen = false }: Props) {
    return (
        <div
            role="status"
            aria-live="polite"
            className={`flex w-full items-center justify-center ${fullScreen ? 'min-h-screen bg-canvas' : 'min-h-72'}`}
        >
            <div className="flex flex-col items-center gap-5">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-line bg-surface shadow-sm">
                    <img
                        src={LOGO_URL}
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                        className="size-9 object-contain"
                    />
                </div>

                <div className="flex flex-col items-center gap-3">
                    <span className="relative block h-[3px] w-32 overflow-hidden rounded-full bg-line" aria-hidden="true">
                        <span className="loading-sweep" />
                    </span>

                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle">
                        {label}
                    </span>
                </div>
            </div>
        </div>
    );
}
