import { NoticeModel } from "@/models/notice"
import { fmtDate } from '@/lib/utils'
import { connectDB, pop } from '@/lib/db'

export async function getRecent(limit: number = 10) {
    await connectDB()
    const notices = await NoticeModel.getRecent(limit)

    return notices.map((n) => ({
        _id: String(n._id),
        title: n.title,
        authorName: pop(n.author, "name") || "Unknown",
        priority: n.priority,
        status: n.status,
        publishDate: fmtDate(n.publishDate),
    }))
}
