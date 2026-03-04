import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Results Overview",
    description: "Comprehensive exam results overview with performance analytics",
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
}: Record<string, ReactNode>) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
                {stats}
            </div>

            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
                {kpi}
            </div>

            {summary}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {chartGrade}
                {chartSubject}
            </div>

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
