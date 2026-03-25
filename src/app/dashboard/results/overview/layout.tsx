import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Results Overview",
    description: "Comprehensive exam results overview with performance analytics",
}

export interface ResultsOverviewLayoutProps {
    stats?: ReactNode
    kpi?: ReactNode
    "chart-grade"?: ReactNode
    "chart-subject"?: ReactNode
    "chart-exam"?: ReactNode
    table?: ReactNode
    "table-performers"?: ReactNode
    "table-classperf"?: ReactNode
    "progress-subjects"?: ReactNode
    summary?: ReactNode
}

export default function ResultsOverviewLayout({
    stats,
    kpi,
    "chart-grade": chartGrade,
    "chart-subject": chartSubject,
    "chart-exam": chartExam,
    table,
    "table-performers": tablePerformers,
    "table-classperf": tableClassperf,
    "progress-subjects": progressSubjects,
    summary,
}: ResultsOverviewLayoutProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
                {stats}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 h-100">
                {chartGrade}
                {chartSubject}
            </div>

            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
                {kpi}
            </div>

            {summary}



            {table}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">{chartExam}</div>
                <div className="lg:col-span-1">{progressSubjects}</div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {tablePerformers}
                {tableClassperf}
            </div>
        </div>
    )
}
