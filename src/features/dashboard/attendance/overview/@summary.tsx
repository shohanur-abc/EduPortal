import { SummaryGrid } from "@/components/molecules/summary-grid"

export function AttendanceSummary({ rate, total, present, todayRate, loading }: AttendanceSummaryProps & { loading?: boolean }) {
    return (
        <SummaryGrid
            title="Attendance Snapshot"
            items={[
                { label: "Overall Rate", value: `${rate}%` },
                { label: "Total Records", value: total.toLocaleString() },
                { label: "Total Present", value: present.toLocaleString() },
                { label: "Today Rate", value: `${todayRate}%` },
            ]}
            columns={4}
            loading={loading}
        />
    )
}

interface AttendanceSummaryProps {
    rate: number
    total: number
    present: number
    todayRate: number
}
