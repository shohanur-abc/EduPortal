import { AttendanceClassWiseTable } from "@/features/dashboard/attendance/overview/@table-classwise"
import * as attendance from "@/services/attendence"

export default async function TableClasswisePage() {
    const data = await attendance.classWiseStats()
    return <AttendanceClassWiseTable data={data} />
}
