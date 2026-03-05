import { StudentStatCards } from "@/features/dashboard/operations/students/@stats"
import { Student } from "@/services/student.service"

export default async function StudentStatsPage() {
    const students = await Student.getAll()

    const activeStudents = students.filter((s) => s.status === "active")
    const activePercentage = students.length > 0 ? Math.round((activeStudents.length / students.length) * 100) : 0
    const maleCount = students.filter((s) => s.gender === "male").length
    const femaleCount = students.filter((s) => s.gender === "female").length
    const otherCount = students.length - maleCount - femaleCount

    return (
        <StudentStatCards
            totalStudents={students.length}
            activeStudents={activeStudents.length}
            activePercentage={activePercentage}
            maleCount={maleCount}
            femaleCount={femaleCount}
            otherCount={otherCount}
        />
    )
}
