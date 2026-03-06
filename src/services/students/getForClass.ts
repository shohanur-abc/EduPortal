import 'server-only'

import { StudentModel } from "@/models/student"
import { connectDB, sid } from '@/lib/db'

export async function getForClass(classSection: string) {
    await connectDB()
    const students = await StudentModel
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
