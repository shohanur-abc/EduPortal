import { StudentModel } from "@/models/student"
import { fmtDate } from '@/lib/utils'
import { connectDB, sid } from '@/lib/db'

export async function getAll(limit?: number) {
    await connectDB()
    const students = await StudentModel.getAll(limit)

    return students.map((s) => ({
        _id: sid(s),
        name: s.name,
        email: s.email,
        rollNumber: s.rollNumber,
        section: s.section,
        guardianName: s.guardianName,
        guardianPhone: s.guardianPhone,
        status: s.status,
        gender: s.gender ?? "",
        dateOfBirth: fmtDate(s.dateOfBirth),
        admissionDate: fmtDate(s.admissionDate),
    }))
}
