import { SchoolExpensesBarChart } from "@/features/dashboard/fees/school-expenses/@barchart"
import { Expense } from "@/services"

export const metadata = {
    title: "School Expenses Chart",
}

export default async function SchoolExpensesBarChartPage() {
    const records = await Expense.getExpenses()

    const byCategory = records.reduce((acc, record) => {
        const key = record.category || "other"
        acc.set(key, (acc.get(key) ?? 0) + record.amount)
        return acc
    }, new Map<string, number>())

    const chartData = Array.from(byCategory.entries())
        .map(([category, amount]) => ({ category: category.replaceAll("-", " "), amount }))
        .sort((a, b) => b.amount - a.amount)

    return <SchoolExpensesBarChart data={chartData} />
}
