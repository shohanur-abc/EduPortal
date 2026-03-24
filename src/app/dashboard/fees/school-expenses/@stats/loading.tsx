import { SchoolExpensesStatCards } from "@/features/dashboard/fees/school-expenses/@stats"

export default function SchoolExpensesStatsLoading() {
    return <SchoolExpensesStatCards totalExpense={0} paidExpense={0} pendingExpense={0} recordsCount={0} loading />
}
