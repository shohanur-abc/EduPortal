import { AttendanceKpi } from "@/features/dashboard/attendance/overview/@kpi"
import { Attendance } from "@/services/attendance.service"

export default async function KpiPage() {
    const [rateData, todayData] = await Promise.all([
        Attendance.attendanceRate(),
        Attendance.todayStats(),
    ])
    return (
        <AttendanceKpi
            rate={rateData.rate}
            todayPresent={todayData.present}
            todayTotal={todayData.total}
            avgLate={todayData.late}
        />
    )
}
