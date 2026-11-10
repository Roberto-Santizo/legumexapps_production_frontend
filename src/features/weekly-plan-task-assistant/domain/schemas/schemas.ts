import { ApiPaginatedResponseSchema, ApiResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const AssistantConversationSchema = z.object({
    id: z.string(),
    title: z.string().nullable(),
    created_at: z.string().nullable(),
    updated_at: z.string().nullable()
});

export const PaginatedAssistantConversationsSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(AssistantConversationSchema),
    lastPage: z.number().optional()
});

export const AssistantConversationMessageSchema = z.object({
    id: z.string(),
    role: z.enum(['user', 'assistant']),
    content: z.string(),
    created_at: z.string().nullable()
});

export const AssistantConversationMessagesResponseSchema = ApiResponseSchema.extend({
    data: z.array(AssistantConversationMessageSchema)
});

export const AssistantErrorResponseSchema = z.object({
    message: z.string()
});
