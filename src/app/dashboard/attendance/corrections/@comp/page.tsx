import { AttendanceCorrections } from "@/features/dashboard/attendance/corrections/@comp";
import * as attendance from "@/services/attendence";

export default async function CorrectionLayout() {
    const records = await attendance.getAll()
    return (
        <AttendanceCorrections records={records} />
    )
}