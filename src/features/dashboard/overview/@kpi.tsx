import { MetricCard } from "@/components/molecules/metric-card"
import { Wallet, TrendingUp, PieChart, Receipt } from "@/lib/icon"

export function MetricCards({ collectionRate, monthlyAvg, totalMethods, totalRecords, loading }: FeeKpiProps & { loading?: boolean }) {
    const metrics: Array<{ subtitle: string; value: string | number; icon: typeof TrendingUp; variant: "success" | "warning" | "danger" | "info" | "default" }> = [
        {
            subtitle: "Collection Rate",
            value: `${collectionRate}%`,
            icon: TrendingUp,
            variant: collectionRate >= 80 ? "success" : collectionRate >= 60 ? "warning" : "danger",
        },
        {
            subtitle: "Avg Collection/Month",
            value: `৳${monthlyAvg.toLocaleString()}`,
            icon: Wallet,
            variant: "info",
        },
        {
            subtitle: "Payment Methods",
            value: totalMethods,
            icon: PieChart,
            variant: "default",
        },
        {
            subtitle: "Total Records",
            value: totalRecords.toLocaleString(),
            icon: Receipt,
            variant: "default",
        }
    ];
    return (
        <>
            {metrics.map((metric, idx) => (
                <MetricCard key={idx} {...metric} loading={loading} classNames={{ card: 'p-2', header: 'pb-1', cardContent: 'px-0' }} />
            ))
            }
        </>
    )
}

interface FeeKpiProps {
    collectionRate: number
    monthlyAvg: number
    totalMethods: number
    totalRecords: number
}
