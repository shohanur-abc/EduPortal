"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const stats = cache(async () => {
    await db.connect()
    const [studentCount, teacherCount, classCount, activeNotices] = await Promise.all([
        db.student.countDocuments({ status: "active" }),
        db.teacher.countDocuments({ status: "active" }),
        db.class.countDocuments({ status: "active" }),
        db.notice.countDocuments({ status: "published" }),
    ])

    const feeTotals = await db.fee.feeTotals("2025-2026")
    const feesTotal = feeTotals[0]?.total ?? 0
    const feesCollected = feeTotals[0]?.collected ?? 0

    const todayAttendance = await db.attendance.getTodayStats()
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
