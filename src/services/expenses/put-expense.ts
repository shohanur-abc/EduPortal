"use server"

import { revalidatePath } from "next/cache"
import { ActionResult } from "@/types/response"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { expenseSchema } from "@/schemas/dashboard"

export async function putExpense(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = expenseSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await db.connect()
    const result = await db.expense.findByIdAndUpdate(id, {
        ...parsed.data,
        date: new Date(parsed.data.date),
    })

    if (!result) return error("Expense record not found")

    revalidatePath(ROUTES.dashboard.fees.schoolExpenses, "layout")
    return success("Expense record updated")
}
