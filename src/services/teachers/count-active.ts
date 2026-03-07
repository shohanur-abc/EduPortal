import { cache } from 'react'
import { TeacherModel } from "@/models/teacher"
import { connectDB } from '@/lib/db'

export const countActive = cache(async () => {
    await connectDB()
    return TeacherModel.countActive()
})
