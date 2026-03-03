import 'server-only'

import { cache } from 'react'
import { ResultModel } from "@/models/result"
import { connectDB, pop } from '@/lib/db'

export class Result {
    static gradeDistribution = cache(async () => {
        await connectDB()
        const distribution = await ResultModel.gradeDistribution()

        return distribution.map((g) => ({
            grade: g._id as string,
            count: g.count as number,
        }))
    })

    static async getRecent(limit: number = 10) {
        await connectDB()
        const results = await ResultModel.getRecent(limit)

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

    static avgBySubject = cache(async () => {
        await connectDB()
        const data = await ResultModel.avgBySubject()

        return data.map((a) => ({
            subject: a._id as string,
            avgMarks: Math.round(a.avgMarks as number),
            totalExams: a.totalExams as number,
        }))
    })

    static async getAll(limit: number = 200) {
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

    static async overview() {
        await connectDB()
        const [gradeDistribution, recentResults, avgBySubject] = await Promise.all([
            Result.gradeDistribution(),
            Result.getRecent(),
            Result.avgBySubject(),
        ])

        return { gradeDistribution, recentResults, avgBySubject }
    }

    static analytics = cache(async () => {
        await connectDB()
        const [byExam, bySubject, byGrade] = await Promise.all([
            ResultModel.aggregate([
                {
                    $group: {
                        _id: "$exam",
                        avgMarks: { $avg: "$marks" },
                        count: { $sum: 1 },
                        passCount: { $sum: { $cond: [{ $gte: ["$marks", 40] }, 1, 0] } },
                    },
                },
                { $sort: { _id: 1 } },
            ]),
            ResultModel.aggregate([
                {
                    $group: {
                        _id: "$subject",
                        avgMarks: { $avg: "$marks" },
                        maxMarks: { $max: "$marks" },
                        minMarks: { $min: "$marks" },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { avgMarks: -1 } },
            ]),
            ResultModel.aggregate([
                { $group: { _id: "$grade", count: { $sum: 1 } } },
                { $sort: { _id: 1 } },
            ]),
        ])

        return {
            byExam: byExam.map((e) => ({
                exam: e._id as string,
                avgMarks: Math.round(e.avgMarks as number),
                count: e.count as number,
                passRate: e.count > 0 ? Math.round(((e.passCount as number) / (e.count as number)) * 100) : 0,
            })),
            bySubject: bySubject.map((s) => ({
                subject: s._id as string,
                avgMarks: Math.round(s.avgMarks as number),
                maxMarks: s.maxMarks as number,
                minMarks: s.minMarks as number,
                count: s.count as number,
            })),
            byGrade: byGrade.map((g) => ({
                grade: g._id as string,
                count: g.count as number,
            })),
        }
    })

    static classPerformance = cache(async () => {
        await connectDB()
        const raw = await ResultModel.classPerformance()
        return raw.map((r) => ({
            className: r.className as string,
            avgMarks: r.avgMarks as number,
            maxMarks: r.maxMarks as number,
            minMarks: r.minMarks as number,
            studentCount: r.studentCount as number,
            passRate: r.passRate as number,
        }))
    })

    static examComparison = cache(async () => {
        await connectDB()
        const raw = await ResultModel.examComparison()
        return raw.map((r) => ({
            exam: r.exam as string,
            avgMarks: r.avgMarks as number,
            maxMarks: r.maxMarks as number,
            minMarks: r.minMarks as number,
            studentCount: r.studentCount as number,
            passRate: r.passRate as number,
        }))
    })

    static topPerformers = cache(async (limit: number = 10) => {
        await connectDB()
        const raw = await ResultModel.topPerformers(limit)
        return raw.map((r) => ({
            studentName: r.studentName as string,
            rollNumber: r.rollNumber as string,
            className: r.className as string,
            avgMarks: r.avgMarks as number,
            totalExams: r.totalExams as number,
        }))
    })

    static subjectWisePerformance = cache(async () => {
        await connectDB()
        const raw = await ResultModel.subjectWisePerformance()
        return raw.map((r) => ({
            subject: r.subject as string,
            avgMarks: r.avgMarks as number,
            maxMarks: r.maxMarks as number,
            minMarks: r.minMarks as number,
            passRate: r.passRate as number,
            failCount: r.failCount as number,
            total: r.total as number,
        }))
    })
}
