import { z } from "zod"

export const noticeSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(200),
    content: z.string().min(10, "Content must be at least 10 characters"),
    priority: z.enum(["low", "medium", "high", "urgent"]),
    targetAudience: z.array(z.enum(["all", "admin", "teacher", "student", "parent"])).min(1, "Select at least one audience"),
    publishDate: z.string().optional(),
    expiryDate: z.string().optional(),
    status: z.enum(["draft", "published", "archived"]),
})

export type NoticeFormData = z.infer<typeof noticeSchema>
