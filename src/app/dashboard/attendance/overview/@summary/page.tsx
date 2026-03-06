import { AttendanceSummary } from "@/features/dashboard/attendance/overview/@summary"
import * as attendance from "@/services/attendence"

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
