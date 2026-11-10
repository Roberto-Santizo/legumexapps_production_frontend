import { AlertCircle } from "lucide-react";

export function AssistantAudioError({ message }: { message: string }) {
    return (
        <p role="alert" className="flex w-full max-w-md items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] text-red-700">
            <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
            <span>No se pudo generar el audio: {message}</span>
        </p>
    )
}
