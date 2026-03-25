"use server"
import { db } from '@/fatman'
import { sid } from '@/fatman/utils'
import mongoose from 'mongoose'

export async function getForClass(classId: string, classSection: string) {
    await db.connect()

    if (!classId || !classSection) return []
    if (!mongoose.Types.ObjectId.isValid(classId)) return []

    const students = await db.student
        .find({ classId: new mongoose.Types.ObjectId(classId), section: classSection, status: "active" })
        .sort({ rollNumber: 1 })
        .lean()

    return students.map((s) => ({
        _id: sid(s),
        name: s.name,
        rollNumber: s.rollNumber,
        section: s.section,
    }))
}
