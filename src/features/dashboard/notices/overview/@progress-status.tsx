import { ProgressList } from "@/components/molecules/progress-list"

export function NoticeStatusProgress({ data, loading }: { data: { status: string; count: number }[]; total: number; loading?: boolean }) {
    return (
        <ProgressList
            title="Status Distribution"
            items={data.map((d) => ({
                label: d.status.charAt(0).toUpperCase() + d.status.slice(1),
                value: d.count,
                max: Math.max(...data.map(dd => dd.count), 1),
                variant: d.status === "published" ? "success" : d.status === "draft" ? "warning" : "info",
            }))}
            loading={loading}
        />
    )
}
