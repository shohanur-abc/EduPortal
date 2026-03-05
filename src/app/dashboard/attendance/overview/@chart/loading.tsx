import { AttendancePieChart } from "@/features/dashboard/attendance/overview/@chart"

export default function ChartLoading() {
    return <AttendancePieChart data={[
        { status: "present", count: 0 },
        { status: "absent", count: 0 },
        { status: "late", count: 0 },
        { status: "excused", count: 0 },
    ]} />
}
