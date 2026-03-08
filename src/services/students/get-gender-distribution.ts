"use server"

import { cache } from 'react'
import { StudentModel } from "@/models/student"
import { connectDB } from '@/lib/db'

export const getGenderDistribution = cache(async () => {
    await connectDB()
    const raw = await StudentModel.genderDistribution()
    return raw.map((r) => ({
        gender: (r._id as string) || "unspecified",
        count: r.count as number,
    }))
})
