import { ProgressList } from "@/components/molecules/progress-list"

export function OperationsCapacityProgress({ data, loading }: { data: { className: string; utilization: number }[]; loading?: boolean }) {
    return (
        <ProgressList
            title="Class Capacity Utilization"
            items={data.map((d) => ({
                label: d.className,
                value: Math.round(d.utilization),
                max: 100,
                variant: d.utilization >= 80 ? "success" : d.utilization >= 50 ? "warning" : "danger",
            }))}
            loading={loading}
        />
    )
}
