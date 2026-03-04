import { ProgressList } from "@/components/molecules/progress-list"

export function FeeClassProgress({ data, loading }: { data: ClassFeeRow[]; loading?: boolean }) {
    return (
        <ProgressList
            title="Class-wise Collection Rate"
            items={data.map((d) => ({
                label: d.className,
                value: d.collectionRate,
                max: 100,
                variant: d.collectionRate >= 80 ? "success" : d.collectionRate >= 60 ? "warning" : "danger",
            }))}
            loading={loading}
        />
    )
}

interface ClassFeeRow {
    className: string
    totalFees: number
    collected: number
    pending: number
    studentCount: number
    collectionRate: number
}
