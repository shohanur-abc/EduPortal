import { AttendanceMonthlyChart } from "@/features/dashboard/attendance/overview/@chart-monthly"
import { Attendance } from "@/services/attendance.service"

export default async function ChartMonthlyPage() {
    const data = await Attendance.monthlySummary()
    return <AttendanceMonthlyChart data={data} />
}
