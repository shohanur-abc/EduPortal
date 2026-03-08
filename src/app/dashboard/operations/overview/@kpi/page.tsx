import { OperationsKpi } from "@/features/dashboard/operations/overview/@kpi"
import { Class } from "@/services"

export default async function Page() {
    const [capacity, gradeDistribution] = await Promise.all([
        Class.getCapacityUtilization(),
        Class.getGradeDistribution(),
    ])
    const totalCapacity = capacity.reduce((s, c) => s + c.maxStudents, 0)
    const totalStudents = capacity.reduce((s, c) => s + c.studentCount, 0)
    const avgUtilization = totalCapacity > 0 ? Math.round((totalStudents / totalCapacity) * 100) : 0
    const totalSubjects = new Set(gradeDistribution.map(g => g.grade)).size * 8
    const avgClassSize = capacity.length > 0 ? Math.round(totalStudents / capacity.length) : 0

    return <OperationsKpi totalCapacity={totalCapacity} utilization={avgUtilization} totalSubjects={totalSubjects} avgClassSize={avgClassSize} />
}
