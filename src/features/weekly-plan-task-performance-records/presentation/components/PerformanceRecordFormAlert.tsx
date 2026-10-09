import { CircleAlertIcon } from "lucide-react";

type Props = {
    messages: string[];
}

export function PerformanceRecordFormAlert({ messages }: Props) {
    if (messages.length === 0) return null;

    return (
        <div role="alert" className="flex gap-3 rounded-lg border border-[#a3402f]/30 bg-[#a3402f]/5 px-4 py-3">
            <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-[#a3402f]" aria-hidden="true" />
            <ul className="space-y-1 text-sm text-[#a3402f]">
                {messages.map(message => <li key={message}>{message}</li>)}
            </ul>
        </div>
    )
}
