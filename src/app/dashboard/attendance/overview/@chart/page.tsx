import { AttendancePieChart } from "@/features/dashboard/attendance/overview/@chart";
import { Attendance } from "@/services/attendance.service";

export default async function ChartPage() {
    const stats = await Attendance.stats()

    return <AttendancePieChart data={[
        { status: "present", count: stats.present },
        { status: "absent", count: stats.absent },
        { status: "late", count: stats.late },
        { status: "excused", count: stats.excused },
    ]} />
}