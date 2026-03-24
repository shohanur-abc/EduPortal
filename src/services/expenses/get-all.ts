import { db } from "@/fatman"
import { fmtDate, pop } from "@/fatman/utils"

export async function getExpenses() {
    await db.connect()
    const expenses = await db.expense.find()
        .populate("issuedBy", "name")
        .sort({ date: -1 })
        .limit(200)

    return expenses.map((expense) => ({
        _id: String(expense._id),
        expenseId: expense.expenseId,
        title: expense.title,
        category: expense.category,
        quantity: expense.quantity ?? "",
        amount: expense.amount,
        date: fmtDate(expense.date),
        status: expense.status,
        paymentMethod: expense.paymentMethod ?? "",
        receiptNumber: expense.receiptNumber ?? "",
        issuedByName: pop(expense.issuedBy, "name") || "",
        remarks: expense.remarks ?? "",
    }))
}
