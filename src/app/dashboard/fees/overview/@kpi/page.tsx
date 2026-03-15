import { FeeKpi } from "@/features/dashboard/fees/overview/@kpi"
import { Fee } from "@/services"

export default async function KpiPage() {
    const [totals, methods, statusBreakdown] = await Promise.all([
        Fee.feeTotals(),
        Fee.paymentMethodBreakdown(),
        Fee.statusBreakdown(),
    ])
    const totalRecords = statusBreakdown.reduce((s, b) => s + b.count, 0)
    const collectionRate = totals.total > 0 ? Math.round((totals.collected / totals.total) * 100 * 10) / 10 : 0

    return (
        <FeeKpi
            collectionRate={collectionRate}
            monthlyAvg={Math.round(totals.collected / 6)}
            totalMethods={methods.length}
            totalRecords={totalRecords}
        />
    )
}
