import { StudentStatCards } from "@/features/dashboard/operations/students/@stats"

export default function StatsLoading() {
    return (
        <StudentStatCards
            totalStudents={22}
            activeStudents={22}
            activePercentage={100}
            maleCount={12}
            femaleCount={8}
            otherCount={2}
            loading
        />
    )
}
