import { cache } from 'react'
import { StudentModel } from "@/models/student"
import { connectDB } from '@/lib/db'

export const getCountActive = cache(async () => {
    await connectDB()
    return StudentModel.countActive()
})
