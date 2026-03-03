import 'server-only'

import { cache } from 'react'
import { NoticeModel } from "@/models/notice"
import { fmtDate } from '@/lib/utils'
import { connectDB, pop } from '@/lib/db'

export class Notice {
    static statusCounts = cache(async () => {
        await connectDB()
        const counts = await NoticeModel.statusCounts()

        return counts.map((s) => ({
            status: s._id as string,
            count: s.count as number,
        }))
    })

    static async getAll() {
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

    static async getRecent(limit: number = 10) {
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

    static async overview() {
        await connectDB()
        const [notices, statusCounts] = await Promise.all([
            Notice.getAll(),
            Notice.statusCounts(),
        ])

        return { notices, statusCounts }
    }

    static priorityBreakdown = cache(async () => {
        await connectDB()
        const raw = await NoticeModel.priorityBreakdown()
        return raw.map((r) => ({
            priority: r._id as string,
            count: r.count as number,
        }))
    })

    static audienceReach = cache(async () => {
        await connectDB()
        const raw = await NoticeModel.audienceReach()
        return raw.map((r) => ({
            audience: r._id as string,
            count: r.count as number,
        }))
    })

    static publishTrend = cache(async (months: number = 6) => {
        await connectDB()
        const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const raw = await NoticeModel.publishTrend(months)
        return raw.map((r) => ({
            month: `${MONTH_NAMES[r._id.month as number]} ${r._id.year}`,
            count: r.count as number,
            published: r.published as number,
        }))
    })

    static async getExpiringSoon(days: number = 7) {
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
}
