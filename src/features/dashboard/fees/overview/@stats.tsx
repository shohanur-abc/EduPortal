import { StatCard } from "@/components/molecules/stat-card"
import { DollarSign, CreditCard, AlertTriangle } from "lucide-react"


export function FeeStatCards({ totalAmount, totalCollected, paidCount, overdueCount, loading }: FeeStats & { loading?: boolean }) {
    return (
        <>
            <StatCard
                title="Total Fees"
                value={`৳${totalAmount.toLocaleString()}`}
                icon={DollarSign}
                footer="Academic year 2025-2026"
                loading={loading}
            />
            <StatCard
                title="Collected"
                value={`৳${totalCollected.toLocaleString()}`}
                icon={CreditCard}
                variant="success"
                trend="up"
                trendValue={`${totalAmount > 0 ? Math.round((totalCollected / totalAmount) * 100) : 0}%`}
                footer="Of total fees"
                loading={loading}
            />
            <StatCard
                title="Pending"
                value={`৳${(totalAmount - totalCollected).toLocaleString()}`}
                icon={AlertTriangle}
                variant="warning"
                footer="Outstanding balance"
                loading={loading}
            />
            <StatCard
                title="Overdue"
                value={overdueCount}
                icon={AlertTriangle}
                variant="danger"
                footer={<><span data-loading={loading}>{paidCount}</span> paid this month</>}
                loading={loading}
            />
        </>
    )
}


// ========== TYPES ==========
interface FeeStats {
    totalAmount: number
    totalCollected: number
    paidCount: number
    overdueCount: number
}
