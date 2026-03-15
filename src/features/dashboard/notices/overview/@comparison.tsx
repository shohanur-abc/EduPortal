import { ComparisonBar } from "@/components/molecules/comparison-bar"

export function NoticePriorityComparison({ data, loading }: { data: { label: string; value: number; color?: string }[]; loading?: boolean }) {
    return (
        <ComparisonBar
            title="Priority Distribution"
            items={data}
            loading={loading}
        />
    )
}
