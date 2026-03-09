"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getAnalytics = cache(async () => {
    await db.connect()
    const [byExam, bySubject, byGrade] = await Promise.all([
        db.result.aggregate([
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
        db.result.aggregate([
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
        db.result.aggregate([
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
