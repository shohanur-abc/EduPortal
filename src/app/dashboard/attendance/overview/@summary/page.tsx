import { AttendanceSummary } from "@/features/dashboard/attendance/overview/@summary"
import { Attendance } from "@/services/attendance.service"

export default async function SummaryPage() {
    const [rateData, todayData] = await Promise.all([
        Attendance.attendanceRate(),
        Attendance.todayStats(),
    ])
    return (
        <AttendanceSummary
            rate={rateData.rate}
            total={rateData.total}
            present={rateData.present}
            todayRate={todayData.rate}
        />
    )
}
