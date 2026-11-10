import type { UIMessage } from "ai";
import { useEffect, useRef } from "react";
import { AssistantMessage, AssistantThinking } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type Props = {
    messages: UIMessage[];
    thinking: boolean;
};

export function AssistantMessageList({ messages, thinking }: Props) {
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ block: 'end' });
    }, [messages, thinking]);

    return (
        <div className="mx-auto w-full max-w-3xl space-y-6 px-6 py-8">
            {messages.map((message) => (
                <AssistantMessage key={message.id} message={message} />
            ))}
            {thinking && <AssistantThinking />}
            <div ref={endRef} />
        </div>
    )
}
