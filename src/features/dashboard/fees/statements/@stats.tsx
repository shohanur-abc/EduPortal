import { StatCard } from "@/components/molecules/stat-card"
import { FileText, CreditCard, AlertTriangle } from "@/lib/icon"

export function FeeStatementStatCards({ totalFees, totalPaid, totalOutstanding, loading }: FeeStatementStats) {
    return (
        <>
            <StatCard
                title="Total Fees"
                value={`৳${totalFees.toLocaleString()}`}
                icon={FileText}
                footer="All assigned fees"
                loading={loading}
            />
            <StatCard
                title="Total Paid"
                value={`৳${totalPaid.toLocaleString()}`}
                icon={CreditCard}
                variant="success"
                trend="up"
                trendValue={`${totalFees > 0 ? Math.round((totalPaid / totalFees) * 100) : 0}%`}
                footer="Of total fees"
                loading={loading}
            />
            <StatCard
                title="Outstanding"
                value={`৳${totalOutstanding.toLocaleString()}`}
                icon={AlertTriangle}
                variant={totalOutstanding > 0 ? "danger" : "success"}
                footer={totalOutstanding > 0 ? "Remaining balance" : "All fees cleared"}
                loading={loading}
            />
        </>
    )
}


// ========== TYPES ==========
interface FeeStatementStats {
    totalFees: number
    totalPaid: number
    totalOutstanding: number
    loading?: boolean
}
