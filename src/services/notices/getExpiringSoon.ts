import 'server-only'

import { NoticeModel } from "@/models/notice"
import { fmtDate } from '@/lib/utils'
import { connectDB, pop } from '@/lib/db'

export async function getExpiringSoon(days: number = 7) {
    await connectDB()
    const notices = await NoticeModel.getExpiringSoon(days)
    return notices.map((n) => ({
        _id: String(n._id),
        title: n.title,
        authorName: pop(n.author, "name") || "Unknown",
        priority: n.priority,
        expiryDate: fmtDate(n.expiryDate),
    }))
}
