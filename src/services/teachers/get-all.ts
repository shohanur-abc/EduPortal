"use server"

import { TeacherModel } from "@/models/teacher"
import { fmtDate } from '@/lib/utils'
import { connectDB, sid } from '@/lib/db'

export async function getAll() {
    await connectDB()
    const teachers = await TeacherModel.getAll()

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
