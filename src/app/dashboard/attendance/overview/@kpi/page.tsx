import { AttendanceKpi } from "@/features/dashboard/attendance/overview/@kpi"
import { Attendance as attendance } from "@/services"

export default async function KpiPage() {
    const [rateData, todayData] = await Promise.all([
        attendance.getAttendanceRate(),
        attendance.getTodayStats(),
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
