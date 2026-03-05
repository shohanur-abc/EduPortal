import { AttendanceDayComparison } from "@/features/dashboard/attendance/overview/@comparison"
import { Attendance } from "@/services/attendance.service"

export default async function ComparisonPage() {
    const today = await Attendance.todayStats()
    return (
        <AttendanceDayComparison data={[
            { label: "Present", value: today.present, color: "var(--chart-1)" },
            { label: "Absent", value: today.absent, color: "var(--chart-5)" },
            { label: "Late", value: today.late, color: "var(--chart-3)" },
            { label: "Excused", value: today.excused, color: "var(--chart-4)" },
        ]} />
    )
}
