import { MetricCards } from "@/features/dashboard/overview/@kpi"
import { Fee } from "@/services"

export default async function Slot() {
    const [totals, methods, monthly] = await Promise.all([
        Fee.feeTotals(),
        Fee.paymentMethodBreakdown(),
        Fee.monthlyCollection(),
    ])

    const collectionRate = totals.total > 0 ? Math.round((totals.collected / totals.total) * 100) : 0
    const monthlyAvg = monthly.length > 0
        ? Math.round(monthly.reduce((sum, item) => sum + item.total, 0) / monthly.length)
        : 0
    const totalMethods = methods.length
    const totalRecords = methods.reduce((sum, item) => sum + item.count, 0)

    return (
        <>
            <MetricCards
                collectionRate={collectionRate}
                monthlyAvg={monthlyAvg}
                totalMethods={totalMethods}
                totalRecords={totalRecords}
            />
        </>
    )
}
