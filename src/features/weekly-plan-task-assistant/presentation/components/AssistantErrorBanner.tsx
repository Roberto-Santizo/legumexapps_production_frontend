import { RotateCcw, X } from "lucide-react";
import { getAssistantErrorMessage } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type Props = {
    error: Error;
    onRetry: () => void;
    onDismiss: () => void;
};

export function AssistantErrorBanner({ error, onRetry, onDismiss }: Props) {
    return (
        <div role="alert" className="mx-auto mb-3 flex w-full max-w-3xl items-center gap-3 px-6">
            <p className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                {getAssistantErrorMessage(error)}
            </p>
            <button
                type="button"
                onClick={onRetry}
                className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-line-strong px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-canvas focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:outline-none"
            >
                <RotateCcw className="size-3.5" />
                Reintentar
            </button>
            <button
                type="button"
                onClick={onDismiss}
                aria-label="Descartar error"
                className="shrink-0 cursor-pointer rounded-md p-1.5 text-ink-muted transition-colors hover:bg-canvas hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:outline-none"
            >
                <X className="size-4" />
            </button>
        </div>
    )
}
