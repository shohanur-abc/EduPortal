import { AttendanceWeeklyTrendChart } from "@/features/dashboard/attendance/overview/@chart-trend"
import * as attendance from "@/services/attendence"

export default async function ChartTrendPage() {
    const data = await attendance.weeklyTrend()
    return <AttendanceWeeklyTrendChart data={data} />
}
