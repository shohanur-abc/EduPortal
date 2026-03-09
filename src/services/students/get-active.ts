"use server"

import { db } from '@/fatman'
import { fmtDate, sid } from '@/fatman/utils'

export async function getActive(limit?: number) {
    await db.connect()
    const students = await db.student.getActive(limit)

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
