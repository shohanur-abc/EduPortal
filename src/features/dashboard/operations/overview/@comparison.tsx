import { ComparisonBar } from "@/components/molecules/comparison-bar"

export function OperationsStudentStatusComparison({ data, loading }: { data: { label: string; value: number; color?: string }[]; loading?: boolean }) {
    return (
        <ComparisonBar
            title="Student Status"
            items={data}
            loading={loading}
        />
    )
}
