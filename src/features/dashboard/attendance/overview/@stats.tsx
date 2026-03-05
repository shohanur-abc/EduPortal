import { StatCard as StatCard$ } from "@/components/molecules/stat-card"
import { CheckCircle, XCircle, Clock, AlertCircle, } from "lucide-react"
import React from "react"


// ============= OVERVIEW SECTION =============
export function StatCards({ present, absent, late, excused, total, loading }: AttendanceStat & { loading?: boolean }) {
    const pct = (n: number) => (total > 0 ? Math.round((n / total) * 100) : 0)
    return (
        < >
            <StatCard
                title="Present"
                value={present}
                icon={CheckCircle}
                variant="success"
                footer={pct(present)}
                loading={loading}
            />

            <StatCard
                title="Absent"
                value={absent}
                icon={XCircle}
                variant="danger"
                footer={pct(absent)}
                loading={loading}
            />

            <StatCard
                title="Late"
                value={late}
                icon={Clock}
                variant="warning"
                footer={pct(late)}
                loading={loading}
            />

            <StatCard
                title="Excused"
                value={excused}
                icon={AlertCircle}
                variant="info"
                footer={pct(excused)}
                loading={loading}
            />
        </>
    )
}
const StatCard = ({ footer, ...props }: React.ComponentProps<typeof StatCard$>) => <StatCard$ {...props} footer={<><span data-loading={props.loading}>{footer}</span>% of total</>} loading={props.loading} />
