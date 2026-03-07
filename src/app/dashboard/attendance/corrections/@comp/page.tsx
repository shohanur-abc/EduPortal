import { AttendanceCorrections } from "@/features/dashboard/attendance/corrections/@comp";
import { Attendance as attendance } from "@/services";

export default async function CorrectionLayout() {
    const records = await attendance.getAll()
    return (
        <AttendanceCorrections records={records} />
    )
}