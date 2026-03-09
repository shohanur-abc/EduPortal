"use server"
import { db } from '@/fatman'
import { sid } from '@/fatman/utils'

export async function getForClass(classSection: string) {
    await db.connect()
    const students = await db.student
        .find({ section: classSection, status: "active" })
        .sort({ rollNumber: 1 })
        .lean()

    return students.map((s) => ({
        _id: sid(s),
        name: s.name,
        rollNumber: s.rollNumber,
        section: s.section,
    }))
}
