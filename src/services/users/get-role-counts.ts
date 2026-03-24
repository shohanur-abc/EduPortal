"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getRoleCounts = cache(async () => {
    await db.connect()
    const [counts, teacherCount, studentCount] = await Promise.all([
        db.user.roleCounts(),
        db.teacher.countDocuments({}).exec(),
        db.student.countDocuments({}).exec(),
    ])

    const roleMap = new Map<string, number>()
    counts.forEach((r) => {
        roleMap.set(r._id as string, r.count as number)
    })
    roleMap.set("teacher", teacherCount)
    roleMap.set("student", studentCount)

    return Array.from(roleMap.entries()).map(([role, count]) => ({ role, count }))
})
