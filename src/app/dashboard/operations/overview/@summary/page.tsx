import { OperationsSummary } from "@/features/dashboard/operations/overview/@summary"
import * as classes from "@/services/classes"
import * as students from "@/services/students"
import * as teachers from "@/services/teachers"
export default async function Page() {
    const [classCount, studentCount, teacherCount, capacity] = await Promise.all([
        classes.countActive(),
        students.countActive(),
        teachers.countActive(),
        classes.capacityUtilization(),
    ])
    const totalStudents = capacity.reduce((s, c) => s + c.studentCount, 0)
    const totalCapacity = capacity.reduce((s, c) => s + c.maxStudents, 0)
    const avgUtilization = totalCapacity > 0 ? Math.round((totalStudents / totalCapacity) * 100) : 0
    return <OperationsSummary classes={classCount} students={studentCount} teachers={teacherCount} avgUtilization={avgUtilization} />
}
