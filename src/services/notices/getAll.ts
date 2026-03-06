import 'server-only'

import { NoticeModel } from "@/models/notice"
import { fmtDate } from '@/lib/utils'
import { connectDB, pop } from '@/lib/db'

export async function getAll() {
    await connectDB()
    const notices = await NoticeModel.getAll()

    return notices.map((n) => ({
        _id: String(n._id),
        title: n.title,
        content: n.content,
        authorName: pop(n.author, "name") || "Unknown",
        priority: n.priority,
        targetAudience: n.targetAudience,
        publishDate: fmtDate(n.publishDate),
        expiryDate: fmtDate(n.expiryDate),
        status: n.status,
    }))
}
