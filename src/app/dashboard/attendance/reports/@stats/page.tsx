import { AttendanceReportStatCards } from "@/features/dashboard/attendance/reports/@stats"
import * as attendance from "@/services/attendence"

export default async function ReportStatsPage() {
    const records = await attendance.getAll()

    const presentCount = records.filter((r) => r.status === "present").length
    const absentCount = records.filter((r) => r.status === "absent").length
    const lateCount = records.filter((r) => r.status === "late").length
    const total = records.length
    const attendanceRate = total > 0 ? Math.round((presentCount / total) * 100) : 0

    return (
        <AttendanceReportStatCards
            total={total}
            presentCount={presentCount}
            absentCount={absentCount}
            lateCount={lateCount}
            attendanceRate={attendanceRate}
        />
    )
}
