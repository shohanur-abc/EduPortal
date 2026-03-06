import 'server-only'

import { cache } from 'react'
import { StudentModel } from "@/models/student"
import { TeacherModel } from "@/models/teacher"
import { ClassModel } from "@/models/class"
import { NoticeModel } from "@/models/notice"
import { FeeModel } from "@/models/fee"
import { AttendanceModel } from "@/models/attendance"
import { connectDB } from '@/lib/db'

export const stats = cache(async () => {
    await connectDB()
    const [studentCount, teacherCount, classCount, activeNotices] = await Promise.all([
        StudentModel.countDocuments({ status: "active" }),
        TeacherModel.countDocuments({ status: "active" }),
        ClassModel.countDocuments({ status: "active" }),
        NoticeModel.countDocuments({ status: "published" }),
    ])

    const feeTotals = await FeeModel.feeTotals("2025-2026")
    const feesTotal = feeTotals[0]?.total ?? 0
    const feesCollected = feeTotals[0]?.collected ?? 0

    const todayAttendance = await AttendanceModel.todayStats()
    const presentCount = todayAttendance.find((a: { _id: string; count: number }) => a._id === "present")?.count ?? 0
    const totalToday = todayAttendance.reduce((sum: number, a: { count: number }) => sum + a.count, 0)
    const attendanceRate = totalToday > 0 ? Math.round((presentCount / totalToday) * 100 * 10) / 10 : 0

    return {
        studentCount,
        teacherCount,
        classCount,
        activeNotices,
        feesTotal,
        feesCollected,
        attendanceRate,
    }
})
