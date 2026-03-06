import { FeeOverdueTable } from "@/features/dashboard/fees/overview/@table-overdue"
import { Fee } from "@/services"

export default async function FeeOverdueTablePage() {
    const [statusBreakdown, overdueList] = await Promise.all([
        Fee.statusBreakdown(),
        Fee.getOverdue(),
    ])

    return <FeeOverdueTable overdueList={overdueList} />
}
