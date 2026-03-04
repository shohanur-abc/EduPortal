import { FeeStatCards } from "@/features/dashboard/fees/overview/@stats"

export default function StatsLoading() {
    return (
        <FeeStatCards
            totalAmount={666666}
            totalCollected={666666}
            paidCount={55555}
            overdueCount={22}
            loading
        />)
}
