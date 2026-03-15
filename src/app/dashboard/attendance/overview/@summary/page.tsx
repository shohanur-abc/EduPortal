import { AttendanceSummary } from "@/features/dashboard/attendance/overview/@summary"
import { Attendance as attendance } from "@/services"

export default async function SummaryPage() {
    const [rateData, todayData] = await Promise.all([
        attendance.getAttendanceRate(),
        attendance.getTodayStats(),
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
