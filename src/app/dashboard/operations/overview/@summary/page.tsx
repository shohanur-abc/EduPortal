import { OperationsSummary } from "@/features/dashboard/operations/overview/@summary"
import { Class } from "@/services/class.service"
import { Student } from "@/services/student.service"
import { Teacher } from "@/services/teacher.service"
export default async function Page() {
    const [classes, students, teachers, capacity] = await Promise.all([
        Class.countActive(),
        Student.countActive(),
        Teacher.countActive(),
        Class.capacityUtilization(),
    ])
    const totalStudents = capacity.reduce((s, c) => s + c.studentCount, 0)
    const totalCapacity = capacity.reduce((s, c) => s + c.maxStudents, 0)
    const avgUtilization = totalCapacity > 0 ? Math.round((totalStudents / totalCapacity) * 100) : 0
    return <OperationsSummary classes={classes} students={students} teachers={teachers} avgUtilization={avgUtilization} />
}
