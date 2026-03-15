"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getCountActive = cache(async () => {
    await db.connect()
    return db.student.countActive()
})
