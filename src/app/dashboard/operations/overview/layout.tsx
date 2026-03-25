import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Operations Overview",
    description: "School operations overview with capacity, staff, and student analytics",
}

export interface OperationsOverviewLayoutProps {
    stats?: ReactNode
    kpi?: ReactNode
    table?: ReactNode
    "table-subjects"?: ReactNode
    "chart-grade"?: ReactNode
    "chart-department"?: ReactNode
    "chart-gender"?: ReactNode
    "progress-capacity"?: ReactNode
    summary?: ReactNode
    comparison?: ReactNode
}

export default function OperationsOverviewLayout({
    stats,
    kpi,
    table,
    "table-subjects": tableSubjects,
    "chart-grade": chartGrade,
    "chart-department": chartDepartment,
    "chart-gender": chartGender,
    "progress-capacity": progressCapacity,
    summary,
    comparison,
}: OperationsOverviewLayoutProps) {
    return (
        <div className="col-span-full grid grid-cols-12 gap-4">
            <div className="col-span-full grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
                {kpi}
            </div>
            <div className="col-span-9">
                {chartGrade}
            </div>
            <div className="col-span-3  grid grid-cols-1 gap-4">{stats}</div>



            <div className="col-span-full">{summary}</div>

            <div className="col-span-6">{chartDepartment}</div>
            <div className="col-span-6">{chartGender}</div>


            <div className="col-span-full grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">{table}</div>
                <div className="lg:col-span-1">{progressCapacity}</div>
            </div>
        </div>
    )
}
