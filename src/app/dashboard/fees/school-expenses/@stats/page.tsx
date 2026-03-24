import { SchoolExpensesStatCards } from "@/features/dashboard/fees/school-expenses/@stats"
import { Expense } from "@/services"

export const metadata = {
    title: "School Expenses Stats",
}

export default async function SchoolExpensesStatsPage() {
    const records = await Expense.getExpenses()

    const totalExpense = records.reduce((sum, record) => sum + record.amount, 0)
    const paidExpense = records.filter((record) => record.status === "paid").reduce((sum, record) => sum + record.amount, 0)
    const pendingExpense = Math.max(totalExpense - paidExpense, 0)

    return (
        <SchoolExpensesStatCards
            totalExpense={totalExpense}
            paidExpense={paidExpense}
            pendingExpense={pendingExpense}
            recordsCount={records.length}
        />
    )
}
