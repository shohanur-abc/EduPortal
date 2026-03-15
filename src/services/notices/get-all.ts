"use server"

import { db } from '@/fatman'
import { fmtDate, pop } from '@/fatman/utils'

export async function getAll() {
    await db.connect()
    const notices = await db.notice.getAll()

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
