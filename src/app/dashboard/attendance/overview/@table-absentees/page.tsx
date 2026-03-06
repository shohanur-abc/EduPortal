import { AttendanceTopAbsenteesTable } from "@/features/dashboard/attendance/overview/@table-absentees"
import * as attendance from "@/services/attendence"

export default async function TableAbsenteesPage() {
    const data = await attendance.topAbsentees()
    return <AttendanceTopAbsenteesTable data={data} />
}
