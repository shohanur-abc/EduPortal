import { ComparisonBar } from "@/components/molecules/comparison-bar"

export function AttendanceDayComparison({ data, loading }: { data: { label: string; value: number; color?: string }[]; loading?: boolean }) {
    return (
        <ComparisonBar
            title="Today's Status Comparison"
            items={data}
            loading={loading}
        />
    )
}
