import { Plus } from "lucide-react";
import { AssistantConversationItem, type AssistantConversation } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type Props = {
    conversations: AssistantConversation[];
    activeId: string | null;
    isLoading: boolean;
    hasMore: boolean;
    isLoadingMore: boolean;
    onNew: () => void;
    onSelect: (id: string) => void;
    onDelete: (conversation: AssistantConversation) => void;
    onLoadMore: () => void;
};

export function AssistantConversationList({ conversations, activeId, isLoading, hasMore, isLoadingMore, onNew, onSelect, onDelete, onLoadMore }: Props) {
    return (
        <aside className="flex max-h-56 w-full shrink-0 flex-col border-b border-line bg-canvas/60 md:max-h-none md:w-72 md:border-r md:border-b-0">
            <div className="flex items-center justify-between gap-2 px-4 pt-4 pb-3">
                <h2 className="font-mono text-[11px] tracking-wider text-ink-subtle uppercase">Conversaciones</h2>
                <button
                    type="button"
                    onClick={onNew}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-ink px-2.5 py-1.5 text-xs font-semibold text-surface transition-colors hover:bg-ink/90 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                    <Plus className="size-3.5" />
                    Nueva
                </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-4">
                {isLoading && <p className="px-3 py-2 text-[13px] text-ink-subtle">Cargando conversaciones…</p>}

                {!isLoading && conversations.length === 0 && (
                    <p className="px-3 py-2 text-[13px] text-ink-muted">Tus preguntas aparecerán aquí para que puedas retomarlas.</p>
                )}

                <ul className="space-y-0.5">
                    {conversations.map((conversation) => (
                        <AssistantConversationItem
                            key={conversation.id}
                            conversation={conversation}
                            active={conversation.id === activeId}
                            onSelect={onSelect}
                            onDelete={onDelete}
                        />
                    ))}
                </ul>

                {hasMore && (
                    <button
                        type="button"
                        onClick={onLoadMore}
                        disabled={isLoadingMore}
                        className="mt-2 w-full cursor-pointer rounded-lg px-3 py-2 text-[13px] text-ink-muted transition-colors hover:bg-surface hover:text-ink disabled:cursor-wait"
                    >
                        {isLoadingMore ? 'Cargando…' : 'Ver anteriores'}
                    </button>
                )}
            </div>
        </aside>
    )
}
