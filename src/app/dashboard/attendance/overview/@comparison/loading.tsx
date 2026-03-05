import { AttendanceDayComparison } from "@/features/dashboard/attendance/overview/@comparison"

export default function Loading() {
    return <AttendanceDayComparison data={[
        { label: "Present", value: 333, color: "var(--chart-1)" },
        { label: "Absent", value: 33, color: "var(--chart-5)" },
        { label: "Late", value: 33, color: "var(--chart-3)" },
        { label: "Excused", value: 33, color: "var(--chart-4)" },
    ]} loading={true} />
}
