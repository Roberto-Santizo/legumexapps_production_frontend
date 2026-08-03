import { Fragment, useSyncExternalStore, type ElementType } from "react";
import { Transition } from "@headlessui/react";
import { AlertTriangle, CheckCircle2, HelpCircle, Info, X, XCircle } from "lucide-react";
import { toastStore } from "@/features/shared/infrastructure/providers/ToastStore";
import type { ToastItem, ToastVariant } from "@/features/shared/domain/types/types";

const ICONS: Record<ToastVariant, ElementType> = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
    question: HelpCircle,
};

const ICON_STYLES: Record<ToastVariant, string> = {
    success: "text-emerald-600",
    error: "text-red-600",
    warning: "text-amber-600",
    info: "text-ink",
    question: "text-ink",
};

export function Toaster() {
    const toasts = useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot, toastStore.getSnapshot);

    return (
        <div className="pointer-events-none fixed top-4 left-1/2 z-100 flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
            {toasts.map((toast) => (
                <ToastCard key={toast.id} toast={toast} />
            ))}
        </div>
    );
}

function ToastCard({ toast }: { toast: ToastItem }) {
    const Icon = ICONS[toast.variant];

    return (
        <Transition
            appear
            show
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-2 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 -translate-y-1 scale-95"
        >
            <div
                role="status"
                onMouseEnter={() => toastStore.pause(toast.id)}
                onMouseLeave={() => toastStore.resume(toast.id)}
                className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 shadow-lg shadow-ink/5"
            >
                <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${ICON_STYLES[toast.variant]}`} />

                <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-semibold text-ink">{toast.message}</p>
                    {toast.description && (
                        <p className="text-sm text-ink-muted">{toast.description}</p>
                    )}
                    {toast.action && (
                        <button
                            type="button"
                            onClick={() => {
                                toast.action?.onClick();
                                toastStore.dismiss(toast.id);
                            }}
                            className="mt-2 cursor-pointer rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-ink/90"
                        >
                            {toast.action.label}
                        </button>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => toastStore.dismiss(toast.id)}
                    className="cursor-pointer rounded-md p-1 text-ink-subtle transition hover:bg-canvas hover:text-ink"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </Transition>
    );
}
