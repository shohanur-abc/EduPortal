import { OperationsSummary } from "@/features/dashboard/operations/overview/@summary"
import { Class, Student, Teacher } from "@/services"

export default async function Page() {
    const [classCount, studentCount, teacherCount, capacity] = await Promise.all([
        Class.getCountActive(),
        Student.getCountActive(),
        Teacher.getCountActive(),
        Class.getCapacityUtilization(),
    ])
    const totalStudents = capacity.reduce((s, c) => s + c.studentCount, 0)
    const totalCapacity = capacity.reduce((s, c) => s + c.maxStudents, 0)
    const avgUtilization = totalCapacity > 0 ? Math.round((totalStudents / totalCapacity) * 100) : 0
    return <OperationsSummary classes={classCount} students={studentCount} teachers={teacherCount} avgUtilization={avgUtilization} />
}
