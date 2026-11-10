import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ASSISTANT_CONVERSATION_PARAM } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type ChatSlot = {
    key: string;
    openedId: string | null;
};

export function useAssistantSelection() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialId = searchParams.get(ASSISTANT_CONVERSATION_PARAM);

    const [slot, setSlot] = useState<ChatSlot>({ key: initialId ?? 'new-0', openedId: initialId });
    const [activeId, setActiveId] = useState<string | null>(initialId);
    const [newCount, setNewCount] = useState(0);

    const writeParam = (id: string | null, replace = false) => {
        setSearchParams(id ? { [ASSISTANT_CONVERSATION_PARAM]: id } : {}, { replace });
    }

    const open = (id: string) => {
        if (id === activeId) return;

        setSlot({ key: id, openedId: id });
        setActiveId(id);
        writeParam(id);
    }

    const startNew = () => {
        const next = newCount + 1;

        setNewCount(next);
        setSlot({ key: `new-${next}`, openedId: null });
        setActiveId(null);
        writeParam(null);
    }

    const assignConversationId = (id: string) => {
        setActiveId(id);
        writeParam(id, true);
    }

    return { slot, activeId, open, startNew, assignConversationId };
}
