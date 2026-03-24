import { StatCard } from "@/components/molecules/stat-card"
import { CheckCircle2, Clock, DollarSign, Receipt } from "@/lib/icon"

export function SchoolExpensesStatCards({ totalExpense, paidExpense, pendingExpense, recordsCount, loading }: SchoolExpenseStats & { loading?: boolean }) {
    return (
        <>
            <StatCard
                title="Total Expense"
                value={`$${totalExpense.toLocaleString()}`}
                icon={DollarSign}
                footer="All expense records"
                loading={loading}
            />
            <StatCard
                title="Paid"
                value={`$${paidExpense.toLocaleString()}`}
                icon={CheckCircle2}
                variant="success"
                trend="up"
                trendValue={`${totalExpense > 0 ? Math.round((paidExpense / totalExpense) * 100) : 0}%`}
                footer="Settled amount"
                loading={loading}
            />
            <StatCard
                title="Pending"
                value={`$${pendingExpense.toLocaleString()}`}
                icon={Clock}
                variant={pendingExpense > 0 ? "warning" : "success"}
                footer={pendingExpense > 0 ? "Awaiting settlement" : "No pending payments"}
                loading={loading}
            />
            <StatCard
                title="Records"
                value={recordsCount}
                icon={Receipt}
                variant="info"
                footer="Expense entries"
                loading={loading}
            />
        </>
    )
}

interface SchoolExpenseStats {
    totalExpense: number
    paidExpense: number
    pendingExpense: number
    recordsCount: number
}
