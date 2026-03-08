"use server"

import { cache } from 'react'
import { ClassModel } from "@/models/class"
import { connectDB } from '@/lib/db'

export const getCountActive = cache(async () => {
    await connectDB()
    return ClassModel.countActive()
})
