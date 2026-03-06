import { AttendanceKpi } from "@/features/dashboard/attendance/overview/@kpi"
import * as attendance from "@/services/attendence"

export default async function KpiPage() {
    const [rateData, todayData] = await Promise.all([
        attendance.attendanceRate(),
        attendance.todayStats(),
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
