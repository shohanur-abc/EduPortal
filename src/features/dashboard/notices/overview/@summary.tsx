import { SummaryGrid } from "@/components/molecules/summary-grid"

export function NoticeSummary({ total, published, drafts, urgent, loading }: NoticeSummaryProps & { loading?: boolean }) {
    return (
        <SummaryGrid
            title="Notice Snapshot"
            items={[
                { label: "Total Notices", value: total },
                { label: "Published", value: published },
                { label: "Drafts", value: drafts },
                { label: "Urgent", value: urgent },
            ]}
            columns={4}
            loading={loading}
        />
    )
}

interface NoticeSummaryProps {
    total: number
    published: number
    drafts: number
    urgent: number
}
