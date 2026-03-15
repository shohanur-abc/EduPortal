import { ReactNode } from "react"

export default function OperationsStaffLayout({
    stats,
    table,
}: {
    stats: ReactNode
    table: ReactNode
    children: ReactNode
}) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-3">{stats}</div>
            {table}
        </div>
    )
}
