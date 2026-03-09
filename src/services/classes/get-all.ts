"use server"

import { db } from '@/fatman'
import { pop, sid } from '@/fatman/utils'

export async function getAll() {
    await db.connect()
    const classes = await db.class.getAll()

    return classes.map((c) => ({
        _id: sid(c),
        name: c.name,
        section: c.section,
        grade: c.grade,
        academicYear: c.academicYear,
        classTeacherName: pop(c.classTeacher, "name") || "Unassigned",
        studentCount: c.studentCount,
        maxStudents: c.maxStudents,
        room: c.room ?? "",
        subjects: c.subjects,
        status: c.status,
    }))
}
