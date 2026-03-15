"use server"

import { db } from '@/fatman'
import { pop } from '@/fatman/utils'

export async function getAll(limit: number = 200) {
    await db.connect()
    const results = await db.result.getAll()

    return results.slice(0, limit).map((r) => ({
        _id: String(r._id),
        studentName: pop(r.student, "name") || "Unknown",
        rollNumber: pop(r.student, "rollNumber"),
        className: `${pop(r.classId, "name")} ${pop(r.classId, "section")}`.trim(),
        exam: r.exam,
        subject: r.subject,
        marks: r.marks,
        totalMarks: r.totalMarks,
        grade: r.grade ?? "N/A",
    }))
}
