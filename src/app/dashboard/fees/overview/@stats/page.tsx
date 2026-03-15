import { FeeStatCards } from "@/features/dashboard/fees/overview/@stats"
import { Fee } from "@/services"

export default async function FeeStatsPage() {
    const statusBreakdown = await Fee.statusBreakdown()
    const totalAmount = statusBreakdown.reduce((s, b) => s + b.total, 0)
    const totalCollected = statusBreakdown.reduce((s, b) => s + b.collected, 0)
    const paidCount = statusBreakdown.find((b) => b.status === "paid")?.count ?? 0
    const overdueCount = statusBreakdown.find((b) => b.status === "overdue")?.count ?? 0

    return <FeeStatCards totalAmount={totalAmount} totalCollected={totalCollected} paidCount={paidCount} overdueCount={overdueCount} />
}
