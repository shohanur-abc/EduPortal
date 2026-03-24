import { AttendanceDonutChart } from "@/features/dashboard/overview/@donut";
import { Attendance } from "@/services"

export default async function Donut() {
    const todayStats = await Attendance.getTodayStats()
    const data = [
        { status: "present", count: todayStats.present },
        { status: "absent", count: todayStats.absent },
        { status: "late", count: todayStats.late },
        { status: "excused", count: todayStats.excused },
    ].filter((item) => item.count > 0)

    return <AttendanceDonutChart data={data} />
}
