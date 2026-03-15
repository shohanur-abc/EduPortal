import { MetricCard } from "@/components/molecules/metric-card"
import { Trophy, TrendingUp, BookOpen, Users } from "@/lib/icon"

export function ResultKpi({ avgMarks, passRate, totalExams, totalStudents, loading }: ResultKpiProps & { loading?: boolean }) {
    return (
        <>
            <MetricCard
                title="Average Marks"
                value={`${avgMarks}%`}
                subtitle="Across all exams"
                icon={TrendingUp}
                variant={avgMarks >= 70 ? "success" : avgMarks >= 50 ? "warning" : "danger"}
                loading={loading}
            />
            <MetricCard
                title="Overall Pass Rate"
                value={`${passRate}%`}
                subtitle="Students scoring 40%+"
                icon={Trophy}
                variant={passRate >= 80 ? "success" : passRate >= 60 ? "warning" : "danger"}
                loading={loading}
            />
            <MetricCard
                title="Total Exams"
                value={totalExams}
                subtitle="Distinct exam types"
                icon={BookOpen}
                variant="info"
                loading={loading}
            />
            <MetricCard
                title="Students Evaluated"
                value={totalStudents.toLocaleString()}
                subtitle="Unique students with results"
                icon={Users}
                variant="default"
                loading={loading}
            />
        </>
    )
}

interface ResultKpiProps {
    avgMarks: number
    passRate: number
    totalExams: number
    totalStudents: number
}
