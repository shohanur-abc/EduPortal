import { StatCard } from "@/components/molecules/stat-card"
import { GraduationCap, User, Users } from "@/lib/icon"


export function StudentStatCards({ totalStudents, activeStudents, activePercentage, maleCount, femaleCount, otherCount, loading }: StudentStats & { loading?: boolean }) {
    return (
        <>
            <StatCard
                title="Total Students"
                value={totalStudents}
                icon={GraduationCap}
                footer="All enrolled students"
                loading={loading}
            />
            <StatCard
                title="Active Students"
                value={activeStudents}
                icon={User}
                variant="success"
                footer={totalStudents > 0 ? <><span data-loading={loading}>{activePercentage}</span> currently active</> : "No student records"}
                loading={loading}
            />
            <StatCard
                title="Gender Breakdown"
                value={`${maleCount}M / ${femaleCount}F`}
                icon={Users}
                variant="info"
                footer={otherCount > 0 ? `${otherCount} other/unspecified` : "No other/unspecified"}
                loading={loading}
            />
        </>
    )
}


interface StudentStats {
    totalStudents: number
    activeStudents: number
    activePercentage: number
    maleCount: number
    femaleCount: number
    otherCount: number
}
