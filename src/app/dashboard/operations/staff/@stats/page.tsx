import { StaffStatCards } from "@/features/dashboard/operations/staff/@stats"
import { Teacher } from "@/services/teacher.service"

export default async function StaffStatsPage() {
    const teachers = await Teacher.getAll()

    const activeTeachers = teachers.filter((t) => t.status === "active")
    const departments = [...new Set(teachers.map((t) => t.department).filter(Boolean))]
    const activePercentage = teachers.length > 0 ? Math.round((activeTeachers.length / teachers.length) * 100) : 0

    return (
        <StaffStatCards
            totalTeachers={teachers.length}
            activeTeachers={activeTeachers.length}
            activePercentage={activePercentage}
            departments={departments}
        />
    )
}
