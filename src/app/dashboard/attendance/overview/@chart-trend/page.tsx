import { AttendanceWeeklyTrendChart } from "@/features/dashboard/attendance/overview/@chart-trend"
import { Attendance } from "@/services/attendance.service"

export default async function ChartTrendPage() {
    const data = await Attendance.weeklyTrend()
    return <AttendanceWeeklyTrendChart data={data} />
}
