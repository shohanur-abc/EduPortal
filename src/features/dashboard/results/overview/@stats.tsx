import { StatCard } from "@/components/molecules/stat-card"
import { FileText, Award, BarChart3 } from "@/lib/icon"


export function ResultStatCards({ totalResults, passRate, subjectCount, topSubject, topSubjectAvg, loading }: ResultStats) {
    return (
        <>
            <StatCard
                title="Total Results"
                value={totalResults}
                icon={FileText}
                footer="All recorded results"
                loading={loading}
            />
            <StatCard
                title="Pass Rate"
                value={`${passRate}%`}
                icon={Award}
                variant={passRate >= 80 ? "success" : passRate >= 60 ? "warning" : "danger"}
                trend={passRate >= 80 ? "up" : "down"}
                footer="Compared to last term"
                loading={loading}
            />
            <StatCard
                title="Subjects Covered"
                value={subjectCount}
                icon={BarChart3}
                footer="Across all exams"
                variant="info"
                loading={loading}
            />
            <StatCard
                title="Top Subject"
                value={topSubject ?? "N/A"}
                icon={Award}
                variant="success"
                footer={topSubjectAvg ? <>Avg: {<span data-loading={loading}>{topSubjectAvg}%</span>} </> : undefined}
                loading={loading}
            />
        </>
    )
}
