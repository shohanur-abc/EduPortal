"use server"

import { connectDB } from "@/lib/db"
import { AttendanceModel } from "@/models/attendance"
import { cache } from "react"

/**
 * #READ: Gets the overall attendance statistics aggregated across all records.
 *
 * The returned object contains:
 * - `present`: total count of students marked as present
 * - `absent`: total count of students marked as absent
 * - `late`: total count of students marked as late
 * - `excused`: total count of students with excused absences
 * - `total`: sum of all attendance statuses
 */
export const getStats = cache(async () => {
    await connectDB()
    const stats = await AttendanceModel.getStats()

    const present = stats.find((s) => s._id === "present")?.count ?? 0
    const absent = stats.find((s) => s._id === "absent")?.count ?? 0
    const late = stats.find((s) => s._id === "late")?.count ?? 0
    const excused = stats.find((s) => s._id === "excused")?.count ?? 0
    const total = present + absent + late + excused

    return { present, absent, late, excused, total }
})