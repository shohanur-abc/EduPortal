import { AttendanceWeeklyTrendChart } from "@/features/dashboard/attendance/overview/@chart-trend"

export default function Loading() {
    return <AttendanceWeeklyTrendChart data={Array(8).fill(0).map((_, i) => ({ week: i + 1, present: 0, absent: 0, late: 0 }))} />
}
