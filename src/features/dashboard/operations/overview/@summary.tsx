import { SummaryGrid } from "@/components/molecules/summary-grid"

export function OperationsSummary({ classes, students, teachers, avgUtilization, loading }: OperationsSummaryProps & { loading?: boolean }) {
    return (
        <SummaryGrid
            // title="Operations Snapshot"
            items={[
                { label: "Active Classes", value: classes },
                { label: "Enrolled Students", value: students.toLocaleString() },
                { label: "Teaching Staff", value: teachers },
                { label: "Avg Utilization", value: `${avgUtilization}%` },
            ]}
            columns={4}
            loading={loading}
            className="bg-transparent p-0 border-0 shadow-none"
            classNames={{ grid: 'bg-transparent p-0', item: 'bg-card' }}
        />
    )
}

interface OperationsSummaryProps {
    classes: number
    students: number
    teachers: number
    avgUtilization: number
}
