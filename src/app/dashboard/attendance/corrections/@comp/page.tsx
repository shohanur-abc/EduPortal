import { AttendanceCorrections } from "@/features/dashboard/attendance/corrections/@comp";
import { Attendance } from "@/services/attendance.service";

export default async function CorrectionLayout() {
    const records = await Attendance.getAll()
    return (
        <AttendanceCorrections records={records} />
    )
}