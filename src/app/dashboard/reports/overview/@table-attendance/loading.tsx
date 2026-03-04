import { AttendanceReportTable } from "@/features/dashboard/reports/overview/@table-attendance"

export default function TableAttendanceLoading() {
    return <AttendanceReportTable data={[{ date: "OOOOOO", status: "OOO", count: 333 }]} loading={true} />
}
