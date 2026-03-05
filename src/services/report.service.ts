import 'server-only'

import { cache } from 'react'
import { AttendanceModel } from "@/models/attendance"
import { FeeModel } from "@/models/fee"
import { ResultModel } from "@/models/result"
import { connectDB } from '@/lib/db'

export class Report {
    static attendanceReport = cache(async (limit: number = 100) => {
        await connectDB()
        const data = await AttendanceModel.reportByDateStatus(limit)

        return data.map((d) => ({
            date: d._id.date as string,
            status: d._id.status as string,
            count: d.count as number,
        }))
    })

    static feeReport = cache(async () => {
        await connectDB()
        const data = await FeeModel.aggregate([
            { $group: { _id: "$status", total: { $sum: "$amount" }, collected: { $sum: "$paidAmount" }, count: { $sum: 1 } } },
        ])

        return data.map((d) => ({
            status: d._id as string,
            total: d.total as number,
            collected: d.collected as number,
            count: d.count as number,
        }))
    })

    static resultReport = cache(async () => {
        await connectDB()
        const data = await ResultModel.aggregate([
            { $group: { _id: { exam: "$exam", subject: "$subject" }, avgMarks: { $avg: "$marks" }, count: { $sum: 1 } } },
            { $sort: { "_id.exam": 1, "_id.subject": 1 } },
        ])

        return data.map((d) => ({
            exam: d._id.exam as string,
            subject: d._id.subject as string,
            avgMarks: Math.round(d.avgMarks as number),
            count: d.count as number,
        }))
    })

    static async getStandard(reportType: string) {
        await connectDB()
        switch (reportType) {
            case "attendance":
                return Report.attendanceReport()
            case "fees":
                return Report.feeReport()
            case "results":
                return Report.resultReport()
            default:
                return []
        }
    }
}
