import { connectDB, pop, sid } from "@/lib/db"
import { ResultModel } from "@/models/result"

// ============= RESULTS: ALL =============
export async function getAllResults() {
    await connectDB()

    const results = await ResultModel.find()
        .populate("student", "name rollNumber")
        .populate("classId", "name section")
        .sort({ createdAt: -1 })
        .limit(200)
        .lean()

    return results.map((r) => ({
        _id: sid(r),
        studentName: pop(r.student, "name") || "Unknown",
        rollNumber: pop(r.student, "rollNumber"),
        className: `${pop(r.classId, "name")} ${pop(r.classId, "section")}`.trim(),
        exam: r.exam,
        subject: r.subject,
        marks: r.marks,
        totalMarks: r.totalMarks,
        grade: r.grade,
    }))
}
