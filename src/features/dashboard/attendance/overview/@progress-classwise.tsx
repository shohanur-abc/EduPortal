import { ProgressList } from "@/components/molecules/progress-list"

export function AttendanceClassProgress({ data, loading }: { data: { className: string; rate: number }[]; loading?: boolean }) {
    return (
        <ProgressList
            title="Class Attendance Rate"
            items={data.map((d) => ({
                label: d.className,
                value: d.rate,
                max: 100,
                variant: d.rate >= 85 ? "success" : d.rate >= 70 ? "warning" : "danger",
            }))}
            loading={loading}
        />
    )
}
