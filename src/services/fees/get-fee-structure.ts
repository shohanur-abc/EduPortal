"use server"

import { FeeModel } from "@/models/fee"
import { connectDB } from '@/lib/db'

export async function feeStructure(academicYear: string = "2025-2026") {
    await connectDB()
    const structure = await FeeModel.feeStructure(academicYear)

    return structure.map((s) => ({
        type: s._id as string,
        totalAmount: s.totalAmount as number,
        avgAmount: Math.round(s.avgAmount as number),
        count: s.count as number,
    }))
}
