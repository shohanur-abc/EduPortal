import { StatCard } from "@/components/molecules/stat-card"
import { AlertTriangle, CreditCard, DollarSign, FileText } from "@/lib/icon"

export function FeesCollectionStatCards({ totalFees, totalCollected, pendingAmount, overdueCount }: FeesCollectionStats) {
    return (
        <>
            <StatCard
                title="Total Assigned"
                value={`৳${totalFees.toLocaleString()}`}
                icon={FileText}
                footer="All fee records"
            />
            <StatCard
                title="Collected"
                value={`৳${totalCollected.toLocaleString()}`}
                icon={CreditCard}
                variant="success"
                trend="up"
                trendValue={`${totalFees > 0 ? Math.round((totalCollected / totalFees) * 100) : 0}%`}
                footer="Collection rate"
            />
            <StatCard
                title="Pending"
                value={`৳${pendingAmount.toLocaleString()}`}
                icon={DollarSign}
                variant={pendingAmount > 0 ? "warning" : "success"}
                footer={pendingAmount > 0 ? "Outstanding balance" : "No pending amount"}
            />
            <StatCard
                title="Overdue Records"
                value={overdueCount}
                icon={AlertTriangle}
                variant={overdueCount > 0 ? "danger" : "success"}
                footer={overdueCount > 0 ? "Requires follow-up" : "No overdue records"}
            />
        </>
    )
}

interface FeesCollectionStats {
    totalFees: number
    totalCollected: number
    pendingAmount: number
    overdueCount: number
}
