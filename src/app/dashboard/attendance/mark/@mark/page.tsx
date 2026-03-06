import { AttendanceMark } from "@/features/dashboard/attendance/mark/@mark"
import * as classes from "@/services/classes"

export default async function MarkAttendancePage() {
    const classData = await classes.getActive()
    return <AttendanceMark classes={classData} />
}
