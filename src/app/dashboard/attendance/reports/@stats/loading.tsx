import { AttendanceReportStatCards } from "@/features/dashboard/attendance/reports/@stats"

export default function StatsLoading() {
    return (
        <AttendanceReportStatCards
            total={333}
            presentCount={333}
            absentCount={22}
            lateCount={22}
            attendanceRate={22}
            loading
        />
    )
}
