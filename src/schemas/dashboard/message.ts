import { z } from "zod"

export const messageSchema = z.object({
    content: z.string().min(1, "Message cannot be empty").max(5000, "Message too long"),
    type: z.enum(["text", "image", "file", "system"]).default("text"),
    replyTo: z.string().optional().nullable(),
})

export type MessageFormData = z.infer<typeof messageSchema>
