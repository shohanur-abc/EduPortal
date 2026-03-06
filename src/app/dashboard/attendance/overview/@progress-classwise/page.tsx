import { AttendanceClassProgress } from "@/features/dashboard/attendance/overview/@progress-classwise"
import * as attendance from "@/services/attendence"

export default async function ProgressClasswisePage() {
    const data = await attendance.classWiseStats()
    return <AttendanceClassProgress data={data.map((d) => ({ className: d.className, rate: d.rate }))} />
}
