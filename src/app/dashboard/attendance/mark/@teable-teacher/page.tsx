import { AttendanceCorrections } from "@/features/dashboard/attendance/mark/@table-teacher";
import { Attendance as attendance } from "@/services";

export default async function CorrectionLayout() {
    const records = await attendance.getAll()
    return (
        <AttendanceCorrections records={records} />
    )
}