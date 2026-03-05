import { FeePaymentMethodChart } from "@/features/dashboard/fees/overview/@chart-methods"
import { Fee } from "@/services/fee.service"

export default async function ChartMethodsPage() {
    const data = await Fee.paymentMethodBreakdown()
    return <FeePaymentMethodChart data={data} />
}
