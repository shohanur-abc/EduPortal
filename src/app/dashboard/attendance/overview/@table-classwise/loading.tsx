import { AttendanceClassWiseTable } from "@/features/dashboard/attendance/overview/@table-classwise"

export default function Loading() {
    return <AttendanceClassWiseTable data={Array(5).fill(0).map(() => ({ className: "OOOOOO", total: 333, present: 333, absent: 33, late: 33, excused: 33, rate: 33 }))} loading={true} />
}
