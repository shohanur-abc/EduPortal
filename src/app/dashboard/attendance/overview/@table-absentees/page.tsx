import { AttendanceTopAbsenteesTable } from "@/features/dashboard/attendance/overview/@table-absentees"
import { Attendance } from "@/services/attendance.service"

export default async function TableAbsenteesPage() {
    const data = await Attendance.topAbsentees()
    return <AttendanceTopAbsenteesTable data={data} />
}
