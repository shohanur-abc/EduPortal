import { StudentStatCards } from "@/features/dashboard/operations/students/@stats"
import { Student } from "@/services"

export default async function StudentStatsPage() {
    const studentsData = await Student.getAll()

    const activeStudents = studentsData.filter((s) => s.status === "active")
    const activePercentage = studentsData.length > 0 ? Math.round((activeStudents.length / studentsData.length) * 100) : 0
    const maleCount = studentsData.filter((s) => s.gender === "male").length
    const femaleCount = studentsData.filter((s) => s.gender === "female").length
    const otherCount = studentsData.length - maleCount - femaleCount

    return (
        <StudentStatCards
            totalStudents={studentsData.length}
            activeStudents={activeStudents.length}
            activePercentage={activePercentage}
            maleCount={maleCount}
            femaleCount={femaleCount}
            otherCount={otherCount}
        />
    )
}
