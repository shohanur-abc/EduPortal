import { OperationStatCards } from "@/features/dashboard/operations/overview/@stats"
import { Class, Student, Teacher } from "@/services"

export default async function OperationStatsPage() {
    const [classCount, studentCount, teacherCount] = await Promise.all([
        Class.getCountActive(),
        Student.getCountActive(),
        Teacher.getCountActive(),
    ])

    return <OperationStatCards classCount={classCount} studentCount={studentCount} teacherCount={teacherCount} />
}
