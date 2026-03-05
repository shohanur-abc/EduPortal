import { AttendanceSummary } from "@/features/dashboard/attendance/overview/@summary"

export default function Loading() {
    return <AttendanceSummary rate={33} total={55555} present={55555} todayRate={33} loading={true} />
}
