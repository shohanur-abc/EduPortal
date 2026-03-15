import { AttendanceWeeklyTrendChart } from "@/features/dashboard/attendance/overview/@chart-trend"
import { Attendance as attendance } from "@/services"

export default async function ChartTrendPage() {
    const data = await attendance.getWeeklyTrend()
    return <AttendanceWeeklyTrendChart data={data} />
}
