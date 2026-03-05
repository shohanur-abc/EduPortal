import { AttendanceMark } from "@/features/dashboard/attendance/mark/@mark"
import { Class } from "@/services/class.service"

export default async function MarkAttendancePage() {
    const classes = await Class.getActive()
    return <AttendanceMark classes={classes} />
}
