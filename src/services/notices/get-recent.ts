"use server"

import { db } from '@/fatman'
import { fmtDate, pop } from '@/fatman/utils'

export async function getRecent(limit: number = 10) {
    await db.connect()
    const notices = await db.notice.getRecent(limit)

    return notices.map((n) => ({
        _id: String(n._id),
        title: n.title,
        authorName: pop(n.author, "name") || "Unknown",
        priority: n.priority,
        status: n.status,
        publishDate: fmtDate(n.publishDate),
    }))
}
