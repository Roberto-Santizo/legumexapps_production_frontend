import { AssistantConversationMessageSchema, AssistantConversationSchema, PaginatedAssistantConversationsSchema } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";
import type { UIMessage } from "ai";
import type { z } from "zod";

export type AssistantConversation = z.infer<typeof AssistantConversationSchema>;
export type PaginatedAssistantConversations = z.infer<typeof PaginatedAssistantConversationsSchema>;
export type AssistantConversationMessage = z.infer<typeof AssistantConversationMessageSchema>;

export type AssistantChatSession = {
    conversationId: string | null;
    messages: UIMessage[];
};
