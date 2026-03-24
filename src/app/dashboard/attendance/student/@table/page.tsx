import { StudentAttendance } from "@/features/dashboard/attendance/student/@table"
import { Class } from "@/services"

export default async function MarkAttendancePage() {
    const classData = await Class.getActive()
    return <StudentAttendance classes={classData} />
}
