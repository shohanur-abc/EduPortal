"use server"

import { db } from '@/fatman'
import { fmtDate, sid } from '@/fatman/utils'

export async function getAll() {
    await db.connect()
    const teachers = await db.teacher.getAll()

    return teachers.map((t) => ({
        _id: sid(t),
        name: t.name,
        email: t.email,
        phone: t.phone ?? "",
        subject: t.subject,
        department: t.department,
        qualification: t.qualification ?? "",
        status: t.status,
        joinDate: fmtDate(t.joinDate),
    }))
}
