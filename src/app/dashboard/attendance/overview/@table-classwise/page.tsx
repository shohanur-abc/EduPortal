import { AttendanceClassWiseTable } from "@/features/dashboard/attendance/overview/@table-classwise"
import { Attendance as attendance } from "@/services"

export default async function TableClasswisePage() {
    const data = await attendance.classWiseStats()
    return <AttendanceClassWiseTable data={data} />
}
