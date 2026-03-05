import 'server-only'

import { cache } from 'react'
import { AttendanceModel } from "@/models/attendance"
import { fmtDate } from '@/lib/utils'
import { connectDB, pop } from '@/lib/db'

export class Attendance {
    static stats = cache(async () => {
        await connectDB()
        const stats = await AttendanceModel.stats()

        const present = stats.find((s) => s._id === "present")?.count ?? 0
        const absent = stats.find((s) => s._id === "absent")?.count ?? 0
        const late = stats.find((s) => s._id === "late")?.count ?? 0
        const excused = stats.find((s) => s._id === "excused")?.count ?? 0
        const total = present + absent + late + excused

        return { present, absent, late, excused, total }
    })

    static async getRecent(limit: number = 10) {
        await connectDB()
        const recentRecords = await AttendanceModel.getRecent(limit)

        return recentRecords.map((r) => ({
            _id: String(r._id),
            studentName: pop(r.student, "name") || "Unknown",
            rollNumber: pop(r.student, "rollNumber"),
            className: `${pop(r.classId, "name")} ${pop(r.classId, "section")}`.trim(),
            date: fmtDate(r.date),
            status: r.status,
            remarks: r.remarks ?? "",
        }))
    }

    static async getAll(limit: number = 200) {
        await connectDB()
        const records = await AttendanceModel.getAll(limit)

        return records.map((r) => ({
            _id: String(r._id),
            studentName: pop(r.student, "name") || "Unknown",
            rollNumber: pop(r.student, "rollNumber"),
            className: `${pop(r.classId, "name")} ${pop(r.classId, "section")}`.trim(),
            date: fmtDate(r.date),
            status: r.status,
            remarks: r.remarks ?? "",
        }))
    }

    static weeklyTrend = cache(async (weeks: number = 8) => {
        await connectDB()
        const raw = await AttendanceModel.weeklyTrend(weeks)
        const weekMap = new Map<string, { week: number; year: number; present: number; absent: number; late: number; excused: number }>()

        for (const r of raw) {
            const key = `${r._id.year}-W${r._id.week}`
            if (!weekMap.has(key)) weekMap.set(key, { week: r._id.week, year: r._id.year, present: 0, absent: 0, late: 0, excused: 0 })
            const entry = weekMap.get(key)!
            entry[r._id.status as "present" | "absent" | "late" | "excused"] = r.count
        }

        return Array.from(weekMap.values()).sort((a, b) => a.year - b.year || a.week - b.week)
    })

    static classWiseStats = cache(async () => {
        await connectDB()
        const raw = await AttendanceModel.classWiseStats()

        return raw.map((r) => ({
            className: `${r._id.className} ${r._id.section}`,
            total: r.total as number,
            present: r.present as number,
            absent: r.absent as number,
            late: r.late as number,
            excused: r.excused as number,
            rate: r.total > 0 ? Math.round((r.present / r.total) * 100 * 10) / 10 : 0,
        }))
    })

    static topAbsentees = cache(async (limit: number = 10) => {
        await connectDB()
        const raw = await AttendanceModel.topAbsentees(limit)

        return raw.map((r) => ({
            studentName: r.studentName as string,
            rollNumber: r.rollNumber as string,
            className: r.className as string,
            absences: r.absences as number,
        }))
    })

    static monthlySummary = cache(async (months: number = 6) => {
        await connectDB()
        const raw = await AttendanceModel.monthlySummary(months)
        const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const monthMap = new Map<string, { month: string; present: number; absent: number; late: number; excused: number }>()

        for (const r of raw) {
            const key = `${r._id.year}-${r._id.month}`
            const label = `${MONTH_NAMES[r._id.month]} ${r._id.year}`
            if (!monthMap.has(key)) monthMap.set(key, { month: label, present: 0, absent: 0, late: 0, excused: 0 })
            const entry = monthMap.get(key)!
            entry[r._id.status as "present" | "absent" | "late" | "excused"] = r.count
        }

        return Array.from(monthMap.values())
    })

    static attendanceRate = cache(async () => {
        await connectDB()
        const raw = await AttendanceModel.attendanceRate()
        const data = raw[0]
        return {
            rate: data ? Math.round(data.rate * 10) / 10 : 0,
            total: data?.total ?? 0,
            present: data?.present ?? 0,
        }
    })

    static todayStats = cache(async () => {
        await connectDB()
        const raw = await AttendanceModel.todayStats()
        const present = raw.find((r: { _id: string }) => r._id === "present")?.count ?? 0
        const absent = raw.find((r: { _id: string }) => r._id === "absent")?.count ?? 0
        const late = raw.find((r: { _id: string }) => r._id === "late")?.count ?? 0
        const excused = raw.find((r: { _id: string }) => r._id === "excused")?.count ?? 0
        const total = present + absent + late + excused
        return { present, absent, late, excused, total, rate: total > 0 ? Math.round((present / total) * 100 * 10) / 10 : 0 }
    })
}

