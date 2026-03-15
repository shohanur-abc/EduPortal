import { FeeMonthlyCollectionChart } from "@/features/dashboard/fees/overview/@chart-collection"
import { Fee } from "@/services"

export default async function ChartCollectionPage() {
    const data = await Fee.monthlyCollection()
    return <FeeMonthlyCollectionChart data={data} />
}
