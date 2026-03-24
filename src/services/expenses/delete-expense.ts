"use server"

import { revalidatePath } from "next/cache"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/fatman"
import { db } from "@/fatman/models"
import { error, success } from "@/fatman/utils"

export async function deleteExpense(id: string): Promise<ActionResult> {
    await db.connect()
    const result = await db.expense.findByIdAndDelete(id)
    if (!result) return error("Expense record not found")

    revalidatePath(ROUTES.dashboard.fees.schoolExpenses, "layout")
    return success("Expense record deleted")
}
