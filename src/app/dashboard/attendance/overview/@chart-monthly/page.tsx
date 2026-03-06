import { AttendanceMonthlyChart } from "@/features/dashboard/attendance/overview/@chart-monthly"
import * as attendance from "@/services/attendence"

export default async function ChartMonthlyPage() {
    const data = await attendance.monthlySummary()
    return <AttendanceMonthlyChart data={data} />
}
