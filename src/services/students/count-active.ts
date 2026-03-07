import { cache } from 'react'
import { StudentModel } from "@/models/student"
import { connectDB } from '@/lib/db'

export const countActive = cache(async () => {
    await connectDB()
    return StudentModel.countActive()
})
