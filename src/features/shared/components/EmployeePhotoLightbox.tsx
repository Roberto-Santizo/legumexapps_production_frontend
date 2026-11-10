import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { getEmployeePhotoUrl } from "@/features/shared/shared";

type Props = {
    open: boolean;
    onClose: () => void;
    code: string;
    name: string;
    detail?: string;
}

export function EmployeePhotoLightbox({ open, onClose, code, name, detail }: Props) {
    return (
        <Dialog open={open} onClose={onClose} className="relative z-[70]">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-ink/85 backdrop-blur-sm motion-safe:transition-opacity motion-safe:duration-200 data-closed:opacity-0"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="relative w-full max-w-sm motion-safe:transition motion-safe:duration-200 motion-safe:ease-out data-closed:scale-95 data-closed:opacity-0"
                >
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Cerrar foto"
                        className="absolute -top-11 right-0 cursor-pointer rounded-md p-1.5 text-surface/70 transition-colors hover:text-surface focus-visible:outline-2 focus-visible:outline-surface"
                    >
                        <XIcon className="size-5" />
                    </button>

                    <div className="overflow-hidden rounded-xl bg-surface shadow-2xl">
                        <img
                            src={getEmployeePhotoUrl(code)}
                            alt={`Foto de ${name}`}
                            className="aspect-[3/4] max-h-[70vh] w-full bg-canvas object-cover object-top"
                        />

                        <div className="flex items-baseline justify-between gap-3 border-t border-line px-4 py-3">
                            <DialogTitle className="truncate text-sm font-semibold text-ink">{name}</DialogTitle>
                            <span className="shrink-0 font-mono text-[11px] tracking-wide text-ink-subtle">{detail ?? code}</span>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
