import { StaffStatCards } from "@/features/dashboard/operations/staff/@stats"
import { Teacher } from "@/services"

export default async function StaffStatsPage() {
    const teachersList = await Teacher.getAll()

    const activeTeachers = teachersList.filter((t) => t.status === "active")
    const departments = [...new Set(teachersList.map((t) => t.department).filter(Boolean))]
    const activePercentage = teachersList.length > 0 ? Math.round((activeTeachers.length / teachersList.length) * 100) : 0

    return (
        <StaffStatCards
            totalTeachers={teachersList.length}
            activeTeachers={activeTeachers.length}
            activePercentage={activePercentage}
            departments={departments}
        />
    )
}
