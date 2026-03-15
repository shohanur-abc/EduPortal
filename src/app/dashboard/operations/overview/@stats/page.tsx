import { OperationStatCards } from "@/features/dashboard/operations/overview/@stats"
import { Class } from "@/services/class.service"
import { Student } from "@/services/student.service"
import { Teacher } from "@/services/teacher.service"

export default async function OperationStatsPage() {
    const [classCount, studentCount, teacherCount] = await Promise.all([
        Class.countActive(),
        Student.countActive(),
        Teacher.countActive(),
    ])

    return <OperationStatCards classCount={classCount} studentCount={studentCount} teacherCount={teacherCount} />
}
