import { ExpensesTable } from "@/features/dashboard/fees/school-expenses/@table"
import { Expense } from "@/services"

export default async function SchoolExpensesTablePage() {
    const records = await Expense.getExpenses()
    return <ExpensesTable records={records} />
}
