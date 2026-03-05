import { AttendanceMonthlyChart } from "@/features/dashboard/attendance/overview/@chart-monthly"

export default function Loading() {
    return <AttendanceMonthlyChart data={Array(6).fill(0).map(() => ({ month: "OOO", present: 0, absent: 0, late: 0, excused: 0 }))} />
}
