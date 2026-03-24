"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"
import { expenseSchema } from "@/schemas/dashboard"

export async function createExpense(raw: unknown): Promise<ActionResult> {
    const parsed = expenseSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await db.connect()
    const expense = await db.expense.create({
        ...parsed.data,
        date: new Date(parsed.data.date),
    })

    revalidatePath(ROUTES.dashboard.fees.schoolExpenses, "layout")
    return success("Expense record created successfully", { data: { _id: String(expense._id) } })
}
