"use server"

import { db } from '@/fatman'

export async function feeStructure(academicYear: string = "2025-2026") {
    await db.connect()
    const structure = await db.fee.feeStructure(academicYear)

    return structure.map((s) => ({
        type: s._id as string,
        totalAmount: s.totalAmount as number,
        avgAmount: Math.round(s.avgAmount as number),
        count: s.count as number,
    }))
}
