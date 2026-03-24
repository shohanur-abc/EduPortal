import { z } from "zod"

export const expenseSchema = z.object({
    expenseId: z.string().min(1, "Expense ID is required"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    category: z.enum(['laboratory', 'maintenance', 'boarding-equipment', 'library', 'sports', 'it-infrastructure', 'transportation', 'cafeteria', 'arts-crafts', 'salary', 'supplies', 'utilities', 'events', 'other']),
    quantity: z.string().optional(),
    amount: z.coerce.number().min(1, "Amount must be at least 1"),
    date: z.string().min(1, "Date is required"),
    status: z.enum(["pending", "approved", "paid", "rejected"]).default("paid"),
    paymentMethod: z.enum(["cash", "card", "bank-transfer", "online", "cheque"]).optional(),
    receiptNumber: z.string().optional(),
    remarks: z.string().optional(),
})

export type ExpenseFormData = z.infer<typeof expenseSchema>
