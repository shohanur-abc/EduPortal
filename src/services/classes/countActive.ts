import 'server-only'

import { cache } from 'react'
import { ClassModel } from "@/models/class"
import { connectDB } from '@/lib/db'

export const countActive = cache(async () => {
    await connectDB()
    return ClassModel.countActive()
})
