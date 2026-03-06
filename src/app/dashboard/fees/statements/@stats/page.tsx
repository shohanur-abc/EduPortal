import { FeeStatementStatCards } from "@/features/dashboard/fees/statements/@stats"
import * as fees from "@/services/fees"

export default async function FeeStatementsStatsPage() {
    const records = await fees.getAll()

    const totalFees = records.reduce((s, r) => s + r.amount, 0)
    const totalPaid = records.reduce((s, r) => s + r.paidAmount, 0)
    const totalOutstanding = totalFees - totalPaid

    return <FeeStatementStatCards totalFees={totalFees} totalPaid={totalPaid} totalOutstanding={totalOutstanding} />
}
