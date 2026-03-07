import { AttendanceSummary } from "@/features/dashboard/attendance/overview/@summary"
import { Attendance as attendance } from "@/services"

export default async function SummaryPage() {
    const [rateData, todayData] = await Promise.all([
        attendance.attendanceRate(),
        attendance.todayStats(),
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
