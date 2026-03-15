import { AttendanceClassProgress } from "@/features/dashboard/attendance/overview/@progress-classwise"
import { Attendance } from "@/services/attendance.service"

export default async function ProgressClasswisePage() {
    const data = await Attendance.classWiseStats()
    return <AttendanceClassProgress data={data.map((d) => ({ className: d.className, rate: d.rate }))} />
}
