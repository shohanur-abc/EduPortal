import { AttendanceTopAbsenteesTable } from "@/features/dashboard/attendance/overview/@table-absentees"
import { Attendance as attendance } from "@/services"

export default async function TableAbsenteesPage() {
    const data = await attendance.getTopAbsentees()
    return <AttendanceTopAbsenteesTable data={data} />
}
