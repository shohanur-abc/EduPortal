import { MetricCard } from "@/components/molecules/metric-card"
import { Wallet, TrendingUp, PieChart, Receipt } from "lucide-react"

export function FeeKpi({ collectionRate, monthlyAvg, totalMethods, totalRecords, loading }: FeeKpiProps & { loading?: boolean }) {
    return (
        <>
            <MetricCard
                title="Collection Rate"
                value={`${collectionRate}%`}
                subtitle="Fees collected vs total"
                icon={TrendingUp}
                variant={collectionRate >= 80 ? "success" : collectionRate >= 60 ? "warning" : "danger"}
                loading={loading}
            />
            <MetricCard
                title="Monthly Avg Collection"
                value={`৳${monthlyAvg.toLocaleString()}`}
                subtitle="Average per month"
                icon={Wallet}
                variant="info"
                loading={loading}
            />
            <MetricCard
                title="Payment Methods"
                value={totalMethods}
                subtitle="Active payment channels"
                icon={PieChart}
                variant="default"
                loading={loading}
            />
            <MetricCard
                title="Total Records"
                value={totalRecords.toLocaleString()}
                subtitle="All fee entries"
                icon={Receipt}
                variant="default"
                loading={loading}
            />
        </>
    )
}

interface FeeKpiProps {
    collectionRate: number
    monthlyAvg: number
    totalMethods: number
    totalRecords: number
}
