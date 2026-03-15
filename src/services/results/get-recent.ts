"use server"

import { db } from '@/fatman'
import { pop } from '@/fatman/utils'

export async function getRecent(limit: number = 10) {
    await db.connect()
    const results = await db.result.getRecent(limit)

    return results.map((r) => ({
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
