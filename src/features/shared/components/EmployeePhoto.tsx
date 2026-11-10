import { useState } from "react";
import { EmployeePhotoLightbox, getEmployeePhotoUrl, getInitials } from "@/features/shared/shared";

type Props = {
    code: string;
    name: string;
    className?: string;
    zoomable?: boolean;
    detail?: string;
}

export function EmployeePhoto({ code, name, className = '', zoomable = false, detail }: Props) {
    const [failedCode, setFailedCode] = useState<string>();
    const [open, setOpen] = useState(false);
    const failed = failedCode === code;
    const canZoom = zoomable && !failed;

    const content = failed ? (
        <span aria-hidden className="absolute inset-0 flex items-center justify-center font-mono text-sm tracking-[0.2em] text-ink-subtle">
            {getInitials(name)}
        </span>
    ) : (
        <img
            src={getEmployeePhotoUrl(code)}
            alt={canZoom ? '' : `Foto de ${name}`}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setFailedCode(code)}
            className="h-full w-full object-cover object-top"
        />
    );

    if (!canZoom) {
        return <div className={`relative overflow-hidden bg-canvas ${className}`}>{content}</div>;
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`Ampliar foto de ${name}`}
                className={`relative cursor-zoom-in overflow-hidden bg-canvas transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${className}`}
            >
                {content}
            </button>

            <EmployeePhotoLightbox open={open} onClose={() => setOpen(false)} code={code} name={name} detail={detail} />
        </>
    );
}
