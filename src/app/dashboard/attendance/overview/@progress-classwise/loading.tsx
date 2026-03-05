import { AttendanceClassProgress } from "@/features/dashboard/attendance/overview/@progress-classwise"

export default function Loading() {
    return <AttendanceClassProgress data={Array(5).fill(0).map(() => ({ className: "OOOOOO", rate: 33 }))} loading={true} />
}
