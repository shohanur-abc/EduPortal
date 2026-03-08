"use server"

import { ResultModel } from "@/models/result"
import { connectDB, pop } from '@/lib/db'

export async function getAll(limit: number = 200) {
    await connectDB()
    const results = await ResultModel.getAll()

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
