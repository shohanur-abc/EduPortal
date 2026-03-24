import { FeesCollectionBarChart } from "@/features/dashboard/fees/collection/@barchart"
import { Fee } from "@/services"

export const metadata = {
    title: "Fees Collection Chart",
}

export default async function FeesCollectionBarChartPage() {
    const monthly = await Fee.monthlyCollection()
    return <FeesCollectionBarChart data={monthly} />
}
