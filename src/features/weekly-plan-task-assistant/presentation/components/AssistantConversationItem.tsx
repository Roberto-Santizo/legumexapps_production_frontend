import { Trash2 } from "lucide-react";
import type { AssistantConversation } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type Props = {
    conversation: AssistantConversation;
    active: boolean;
    onSelect: (id: string) => void;
    onDelete: (conversation: AssistantConversation) => void;
};

export function AssistantConversationItem({ conversation, active, onSelect, onDelete }: Props) {
    return (
        <li className={`group relative rounded-lg transition-colors ${active ? 'bg-surface shadow-sm ring-1 ring-line' : 'hover:bg-surface/70'}`}>
            <button
                type="button"
                onClick={() => onSelect(conversation.id)}
                aria-current={active ? 'true' : undefined}
                className="w-full cursor-pointer rounded-lg py-2 pr-9 pl-3 text-left focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:outline-none"
            >
                <span className="line-clamp-2 text-[13px] leading-snug text-ink">{conversation.title ?? 'Conversación sin título'}</span>
                {conversation.updated_at && (
                    <span className="mt-0.5 block font-mono text-[10.5px] tabular-nums text-ink-subtle">{conversation.updated_at}</span>
                )}
            </button>
            <button
                type="button"
                onClick={() => onDelete(conversation)}
                aria-label="Eliminar conversación"
                className="absolute top-2 right-1.5 cursor-pointer rounded-md p-1 text-ink-subtle opacity-0 transition hover:bg-canvas hover:text-red-600 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:outline-none group-hover:opacity-100"
            >
                <Trash2 className="size-3.5" />
            </button>
        </li>
    )
}
