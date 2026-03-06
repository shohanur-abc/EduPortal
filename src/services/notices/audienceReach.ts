import 'server-only'

import { cache } from 'react'
import { NoticeModel } from "@/models/notice"
import { connectDB } from '@/lib/db'

export const audienceReach = cache(async () => {
    await connectDB()
    const raw = await NoticeModel.audienceReach()
    return raw.map((r) => ({
        audience: r._id as string,
        count: r.count as number,
    }))
})
