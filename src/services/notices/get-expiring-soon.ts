"use server"

import { db } from '@/fatman'
import { fmtDate, pop } from '@/fatman/utils'

export async function getExpiringSoon(days: number = 7) {
    await db.connect()
    const notices = await db.notice.getExpiringSoon(days)
    return notices.map((n) => ({
        _id: String(n._id),
        title: n.title,
        authorName: pop(n.author, "name") || "Unknown",
        priority: n.priority,
        expiryDate: fmtDate(n.expiryDate),
    }))
}
