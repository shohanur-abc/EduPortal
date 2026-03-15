import { AttendancePieChart } from "@/features/dashboard/attendance/overview/@chart";
import { Attendance as attendance } from "@/services";

export default async function ChartPage() {
    const stats = await attendance.getStats()

    return <AttendancePieChart data={[
        { status: "present", count: stats.present },
        { status: "absent", count: stats.absent },
        { status: "late", count: stats.late },
        { status: "excused", count: stats.excused },
    ]} />
}