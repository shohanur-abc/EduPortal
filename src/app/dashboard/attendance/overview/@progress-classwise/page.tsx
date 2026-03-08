import { AttendanceClassProgress } from "@/features/dashboard/attendance/overview/@progress-classwise"
import { Attendance as attendance } from "@/services"

export default async function ProgressClasswisePage() {
    const data = await attendance.getClassWiseStats()
    return <AttendanceClassProgress data={data.map((d) => ({ className: d.className, rate: d.rate }))} />
}
