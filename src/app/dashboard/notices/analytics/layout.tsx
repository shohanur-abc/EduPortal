import { ReactNode } from "react"

interface NoticesAnalyticsLayoutProps {
    stats: ReactNode
}

export default function NoticesAnalyticsLayout({
    stats,
}: NoticesAnalyticsLayoutProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">{stats}</div>
        </div>
    )
}
