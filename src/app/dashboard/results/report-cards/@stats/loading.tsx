import { ReportCardStatCards } from "@/features/dashboard/results/report-cards/@stats"

export default function StatsLoading() {
    return <ReportCardStatCards uniqueStudents={10} passRate={10} avgMarks={10} loading={true} />
}
