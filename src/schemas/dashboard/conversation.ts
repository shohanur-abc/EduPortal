import { z } from "zod"

export const conversationSchema = z.object({
    name: z.string().max(100).optional(),
    type: z.enum(["direct", "group"]),
    description: z.string().max(500).optional(),
    participantIds: z.array(z.string()).min(1, "At least one participant is required"),
})

export type ConversationFormData = z.infer<typeof conversationSchema>
