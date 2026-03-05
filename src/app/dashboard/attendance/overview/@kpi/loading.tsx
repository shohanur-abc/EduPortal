import { AttendanceKpi } from "@/features/dashboard/attendance/overview/@kpi"

export default function KpiLoading() {
    return <AttendanceKpi rate={33} todayPresent={333} todayTotal={555} avgLate={33} loading={true} />
}
