"use server"

import { ClassModel } from "@/models/class"
import { connectDB, pop, sid } from '@/lib/db'

export async function getAll() {
    await connectDB()
    const classes = await ClassModel.getAll()

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
