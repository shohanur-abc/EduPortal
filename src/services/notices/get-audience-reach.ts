"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getAudienceReach = cache(async () => {
    await db.connect()
    const raw = await db.notice.audienceReach()
    return raw.map((r) => ({
        audience: r._id as string,
        count: r.count as number,
    }))
})
