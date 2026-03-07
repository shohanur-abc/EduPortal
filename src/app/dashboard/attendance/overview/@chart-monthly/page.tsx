import { AttendanceMonthlyChart } from "@/features/dashboard/attendance/overview/@chart-monthly"
import { Attendance as attendance } from "@/services"

export default async function ChartMonthlyPage() {
    const data = await attendance.monthlySummary()
    return <AttendanceMonthlyChart data={data} />
}
