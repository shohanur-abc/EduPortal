import { FeeStatementStatCards } from "@/features/dashboard/fees/statements/@stats"

export default function StatsLoading() {
    return (
        <FeeStatementStatCards
            totalFees={666666}
            totalPaid={666666}
            totalOutstanding={55555}
            loading
        />
    )
}
