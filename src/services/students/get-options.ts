"use server"

import { db } from '@/fatman'
import { sid } from '@/fatman/utils'

export async function getOptions() {
    await db.connect()
    const students = await db.student.getOptions()

    return students.map((s) => ({
        _id: sid(s),
        name: String(s.name),
        rollNumber: String(s.rollNumber),
    }))
}
