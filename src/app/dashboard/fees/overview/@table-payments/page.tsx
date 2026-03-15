import { RecentPaymentsTable } from "@/features/dashboard/fees/overview/@table-payments"
import { Fee } from "@/services"

export default async function FeeTablePage() {
    const recentPayments = await Fee.getRecentPayments()
    return <RecentPaymentsTable recentPayments={recentPayments} />
}
