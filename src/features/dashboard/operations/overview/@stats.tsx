import { StatCard } from "@/components/molecules/stat-card"
import { School, GraduationCap, Users } from "@/lib/icon"


export function OperationStatCards({ classCount, studentCount, teacherCount, loading }: OperationsStats & { loading?: boolean }) {
    return (
        <>
            <StatCard
                title="Active Classes"
                value={classCount}
                icon={School}
                variant="info"
                footer="Current academic year"
                loading={loading}
            />
            <StatCard
                title="Enrolled Students"
                value={studentCount}
                icon={GraduationCap}
                variant="success"
                footer="Active students"
                loading={loading}
            />
            <StatCard
                title="Teaching Staff"
                value={teacherCount}
                icon={Users}
                footer="All faculty members"
                loading={loading}
            />
        </>
    )
}


// ============= Types ============

interface OperationsStats {
    classCount: number
    studentCount: number
    teacherCount: number
}
