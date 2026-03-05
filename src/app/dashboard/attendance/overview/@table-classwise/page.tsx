import { AttendanceClassWiseTable } from "@/features/dashboard/attendance/overview/@table-classwise"
import { Attendance } from "@/services/attendance.service"

export default async function TableClasswisePage() {
    const data = await Attendance.classWiseStats()
    return <AttendanceClassWiseTable data={data} />
}
