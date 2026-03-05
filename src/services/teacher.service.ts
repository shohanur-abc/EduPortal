import 'server-only'

import { cache } from 'react'
import { TeacherModel } from "@/models/teacher"
import { fmtDate } from '@/lib/utils'
import { connectDB, sid } from '@/lib/db'

export class Teacher {
    static async getAll() {
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

    static countActive = cache(async () => {
        await connectDB()
        return TeacherModel.countActive()
    })

    static departmentDistribution = cache(async () => {
        await connectDB()
        const raw = await TeacherModel.departmentDistribution()
        return raw.map((r) => ({
            department: r._id as string,
            count: r.count as number,
        }))
    })

    static subjectCoverage = cache(async () => {
        await connectDB()
        const raw = await TeacherModel.subjectCoverage()
        return raw.map((r) => ({
            subject: r._id as string,
            count: r.count as number,
            activeCount: r.activeCount as number,
        }))
    })

    static statusBreakdown = cache(async () => {
        await connectDB()
        const raw = await TeacherModel.statusBreakdown()
        return raw.map((r) => ({
            status: r._id as string,
            count: r.count as number,
        }))
    })
}
