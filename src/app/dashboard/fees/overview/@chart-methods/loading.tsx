import { FeePaymentMethodChart } from "@/features/dashboard/fees/overview/@chart-methods"

export default function Loading() {
    return <FeePaymentMethodChart data={Array(3).fill(0).map(() => ({ method: "OOO", total: 0, count: 0 }))} />
}
