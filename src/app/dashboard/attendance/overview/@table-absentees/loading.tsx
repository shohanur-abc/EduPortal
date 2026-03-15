import { AttendanceTopAbsenteesTable } from "@/features/dashboard/attendance/overview/@table-absentees"

export default function Loading() {
    return <AttendanceTopAbsenteesTable data={Array(5).fill(0).map(() => ({ studentName: "OOOOOO", rollNumber: "OOO-OOO", className: "OOOOOO", absences: 33 }))} loading={true} />
}
