import { cache } from 'react'
import { TeacherModel } from "@/models/teacher"
import { connectDB } from '@/lib/db'

export const getCountActive = cache(async () => {
    await connectDB()
    return TeacherModel.countActive()
})
