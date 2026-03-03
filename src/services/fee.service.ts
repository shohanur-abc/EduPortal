import 'server-only'

import { cache } from 'react'
import { FeeModel } from "@/models/fee"
import { fmtDate } from '@/lib/utils'
import { connectDB, pop } from '@/lib/db'

export class Fee {
    static statusBreakdown = cache(async (academicYear: string = "2025-2026") => {
        await connectDB()
        const breakdown = await FeeModel.statusBreakdown(academicYear)

        return breakdown.map((s) => ({
            status: s._id as string,
            count: s.count as number,
            total: s.total as number,
            collected: s.collected as number,
        }))
    })

    static async getRecentPayments(limit: number = 10) {
        await connectDB()
        const payments = await FeeModel.getRecentPayments(limit)

        return payments.map((f) => ({
            _id: String(f._id),
            studentName: pop(f.student, "name") || "Unknown",
            rollNumber: pop(f.student, "rollNumber"),
            type: f.type,
            amount: f.amount,
            paidAmount: f.paidAmount,
            paidDate: fmtDate(f.paidDate),
            paymentMethod: f.paymentMethod ?? "",
            receiptNumber: f.receiptNumber ?? "",
        }))
    }

    static async getOverdue(limit: number = 10) {
        await connectDB()
        const overdue = await FeeModel.getOverdue(limit)

        return overdue.map((f) => ({
            _id: String(f._id),
            studentName: pop(f.student, "name") || "Unknown",
            rollNumber: pop(f.student, "rollNumber"),
            type: f.type,
            amount: f.amount,
            paidAmount: f.paidAmount,
            dueDate: fmtDate(f.dueDate),
            status: f.status,
        }))
    }

    static async getAll(limit: number = 200) {
        await connectDB()
        const fees = await FeeModel.getAll(limit)

        return fees.map((f) => ({
            _id: String(f._id),
            studentName: pop(f.student, "name") || "Unknown",
            rollNumber: pop(f.student, "rollNumber"),
            type: f.type,
            amount: f.amount,
            paidAmount: f.paidAmount,
            dueDate: fmtDate(f.dueDate),
            paidDate: fmtDate(f.paidDate),
            status: f.status,
            paymentMethod: f.paymentMethod ?? "",
            receiptNumber: f.receiptNumber ?? "",
            academicYear: f.academicYear,
        }))
    }

    static async feeStructure(academicYear: string = "2025-2026") {
        await connectDB()
        const structure = await FeeModel.feeStructure(academicYear)

        return structure.map((s) => ({
            type: s._id as string,
            totalAmount: s.totalAmount as number,
            avgAmount: Math.round(s.avgAmount as number),
            count: s.count as number,
        }))
    }

    static feeTotals = cache(async (academicYear: string = "2025-2026") => {
        await connectDB()
        const totals = await FeeModel.feeTotals(academicYear)

        return {
            total: totals[0]?.total ?? 0,
            collected: totals[0]?.collected ?? 0,
        }
    })

    static async overview(academicYear: string = "2025-2026") {
        await connectDB()
        const [statusBreakdown, recentPayments, overdueList] = await Promise.all([
            Fee.statusBreakdown(academicYear),
            Fee.getRecentPayments(),
            Fee.getOverdue(),
        ])

        return { statusBreakdown, recentPayments, overdueList }
    }

    static monthlyCollection = cache(async (academicYear: string = "2025-2026") => {
        await connectDB()
        const raw = await FeeModel.monthlyCollection(academicYear)
        return raw.map((r) => ({
            month: r._id as string,
            total: r.total as number,
            count: r.count as number,
        }))
    })

    static paymentMethodBreakdown = cache(async (academicYear: string = "2025-2026") => {
        await connectDB()
        const raw = await FeeModel.paymentMethodBreakdown(academicYear)
        return raw.map((r) => ({
            method: r._id as string,
            total: r.total as number,
            count: r.count as number,
        }))
    })

    static topDefaulters = cache(async (academicYear: string = "2025-2026", limit: number = 10) => {
        await connectDB()
        const raw = await FeeModel.topDefaulters(academicYear, limit)
        return raw.map((r) => ({
            studentName: r.studentName as string,
            rollNumber: r.rollNumber as string,
            totalDue: r.totalDue as number,
            count: r.count as number,
        }))
    })

    static classWiseFees = cache(async (academicYear: string = "2025-2026") => {
        await connectDB()
        const raw = await FeeModel.classWiseFees(academicYear)
        return raw.map((r) => ({
            className: r.className as string,
            totalFees: r.totalFees as number,
            collected: r.collected as number,
            pending: r.pending as number,
            studentCount: r.studentCount as number,
            collectionRate: r.totalFees > 0 ? Math.round((r.collected / r.totalFees) * 100 * 10) / 10 : 0,
        }))
    })
}
