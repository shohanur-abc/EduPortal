import { OperationStatCards } from "@/features/dashboard/operations/overview/@stats"
import { Class, Student, Teacher } from "@/services"

export default async function OperationStatsPage() {
    const [classCount, studentCount, teacherCount] = await Promise.all([
        Class.countActive(),
        Student.countActive(),
        Teacher.countActive(),
    ])

    return <OperationStatCards classCount={classCount} studentCount={studentCount} teacherCount={teacherCount} />
}
