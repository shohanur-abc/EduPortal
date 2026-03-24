"use server"

import { Types } from "mongoose"
import { db } from "@/fatman"
import { sid } from "@/fatman/utils"

export async function getMatrix(classId: string, month?: string, week?: string): Promise<AttendanceMatrixResult> {
    await db.connect()

    const monthDate = parseMonth(month)
    const [weekStart, weekEnd] = parseWeekRange(week)
    const days = getDaysInRange(weekStart, weekEnd)

    const startDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), weekStart, 0, 0, 0, 0)
    const endDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), weekEnd, 23, 59, 59, 999)

    const students = await db.student
        .find({ classId: new Types.ObjectId(classId), status: "active" })
        .sort({ rollNumber: 1 })
        .select("_id name rollNumber")
        .lean()

    if (students.length === 0) {
        return {
            days,
            rows: [],
            monthKey: formatMonthKey(monthDate),
            weekKey: `${Math.ceil(weekStart / 7)}-${Math.ceil(weekEnd / 7)}`,
        }
    }

    const studentIds = students.map((student) => student._id)
    const records = await db.attendance
        .find({
            classId: new Types.ObjectId(classId),
            student: { $in: studentIds },
            date: { $gte: startDate, $lte: endDate },
        })
        .select("student date status")
        .lean()

    const statusMap = new Map<string, MatrixStatus>()
    for (const record of records) {
        const day = new Date(record.date).getDate()
        const key = `${String(record.student)}-${day}`
        statusMap.set(key, record.status as MatrixStatus)
    }

    const rows = students.map((student) => {
        const dayStatus: Record<string, MatrixStatus> = {}
        for (const day of days) {
            const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day)
            const isWeekend = date.getDay() === 0 || date.getDay() === 6
            const key = `${String(student._id)}-${day}`
            dayStatus[`d${day}`] = statusMap.get(key) ?? (isWeekend ? "off" : "unmarked")
        }

        return {
            id: sid(student),
            name: student.name,
            rollNumber: student.rollNumber,
            statuses: dayStatus,
        }
    })

    return {
        days,
        rows,
        monthKey: formatMonthKey(monthDate),
        weekKey: `${Math.ceil(weekStart / 7)}-${Math.ceil(weekEnd / 7)}`,
    }
}

function parseMonth(month?: string) {
    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth(), 1)
    }

    const [year, monthIndex] = month.split("-").map(Number)
    return new Date(year, monthIndex - 1, 1)
}

function parseWeekRange(week?: string): [number, number] {
    if (!week || !/^\d-\d$/.test(week)) return [8, 21]

    const [startWeek, endWeek] = week.split("-").map(Number)
    const startDay = (startWeek - 1) * 7 + 1
    const endDay = endWeek * 7

    return [Math.max(startDay, 1), Math.min(endDay, 31)]
}

function getDaysInRange(startDay: number, endDay: number) {
    return Array.from({ length: endDay - startDay + 1 }, (_, index) => startDay + index)
}

function formatMonthKey(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    return `${year}-${month}`
}

type MatrixStatus = "present" | "absent" | "late" | "excused" | "off" | "unmarked"

export interface AttendanceMatrixResult {
    days: number[]
    rows: MatrixRow[]
    monthKey: string
    weekKey: string
}

export interface MatrixRow {
    id: string
    name: string
    rollNumber: string
    statuses: Record<string, MatrixStatus>
}
