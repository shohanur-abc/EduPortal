import { AttendanceMark } from "@/features/dashboard/attendance/mark/@mark"
import { Class as classes } from "@/services"

export default async function MarkAttendancePage() {
    const classData = await classes.getActive()
    return <AttendanceMark classes={classData} />
}
