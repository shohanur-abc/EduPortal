"use server"

import { db } from '@/fatman'
import { fmtDate, sid } from '@/fatman/utils'

export async function getAll(limit?: number) {
    await db.connect()
    const students = await db.student.getAll(limit)

    return students.map((s) => ({
        _id: sid(s),
        name: s.name,
        email: s.email,
        classId: s.classId ? sid(s.classId) : "",
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
