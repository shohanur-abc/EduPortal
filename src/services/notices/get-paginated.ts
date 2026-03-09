"use server"

import { db } from '@/fatman'
import { fmtDate, pop } from '@/fatman/utils'


export async function getPaginated(
    page: number = 1,
    pageSize: number = 12,
    filters?: { status?: string; priority?: string; search?: string },
): Promise<PaginatedNoticesResult> {
    await db.connect()

    const query: Record<string, unknown> = {}

    if (filters?.status && filters.status !== "all") {
        query.status = filters.status
    }
    if (filters?.priority && filters.priority !== "all") {
        query.priority = filters.priority
    }
    if (filters?.search) {
        query.$or = [
            { title: { $regex: filters.search, $options: "i" } },
            { content: { $regex: filters.search, $options: "i" } },
        ]
    }

    const [notices, total] = await Promise.all([
        db.notice.find(query)
            .populate("author", "name")
            .sort({ publishDate: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize),
        db.notice.countDocuments(query),
    ])

    return {
        items: notices.map((n) => ({
            _id: String(n._id),
            title: n.title,
            content: n.content,
            authorName: pop(n.author, "name") || "Unknown",
            priority: n.priority,
            targetAudience: n.targetAudience,
            publishDate: fmtDate(n.publishDate),
            expiryDate: fmtDate(n.expiryDate),
            status: n.status,
        })),
        total,
        page,
        pageSize,
        hasMore: page * pageSize < total,
    }
}


export interface PaginatedNoticesResult {
    items: {
        _id: string
        title: string
        content: string
        authorName: string
        priority: string
        targetAudience: string[]
        publishDate: string
        expiryDate: string
        status: string
    }[]
    total: number
    page: number
    pageSize: number
    hasMore: boolean
}
