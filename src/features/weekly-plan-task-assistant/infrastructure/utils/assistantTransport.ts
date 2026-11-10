import { DefaultChatTransport, type UIMessage } from "ai";
import { getMessageText, parseAssistantRequestError } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

export const ASSISTANT_ASK_URL = `${import.meta.env.VITE_BASE_URL}/weekly-plan-task-assistant/ask`;
export const CONVERSATION_ID_HEADER = 'X-Conversation-Id';

type Options = {
    getConversationId: () => string | null;
    onConversationId: (id: string) => void;
};

const authHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('AUTH_TOKEN');

    return token ? { Authorization: `Bearer ${token}` } : {};
}

export const createAssistantTransport = ({ getConversationId, onConversationId }: Options) => {
    return new DefaultChatTransport<UIMessage>({
        api: ASSISTANT_ASK_URL,
        headers: () => ({ Accept: 'text/event-stream', ...authHeaders() }),
        prepareSendMessagesRequest: ({ messages }) => {
            const last = messages[messages.length - 1];

            return { body: { message: getMessageText(last), conversation_id: getConversationId() } };
        },
        fetch: async (input, init) => {
            const response = await fetch(input, init);
            const id = response.headers.get(CONVERSATION_ID_HEADER);

            if (id) onConversationId(id);

            if (!response.ok) throw await parseAssistantRequestError(response);

            return response;
        }
    });
}
