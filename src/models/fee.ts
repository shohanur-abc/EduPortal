import mongoose, { Schema } from "mongoose"
import "./student"

// ============= SCHEMA DEFINITION =============
const feeSchema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        type: {
            type: String,
            enum: ["tuition", "exam", "library", "transport", "hostel", "other"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        paidDate: {
            type: Date,
        },
        paidAmount: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["paid", "unpaid", "partial", "overdue", "waived"],
            default: "unpaid",
        },
        paymentMethod: {
            type: String,
            enum: ["cash", "card", "bank-transfer", "online", "cheque"],
        },
        receiptNumber: {
            type: String,
        },
        academicYear: {
            type: String,
            required: true,
        },
        month: {
            type: String,
            required: true,
        },
        remarks: {
            type: String,
        },
    },
    {
        timestamps: true,

        statics: {
            statusBreakdown(academicYear: string) {
                return this.aggregate([
                    { $match: { academicYear } },
                    { $group: { _id: "$status", count: { $sum: 1 }, total: { $sum: "$amount" }, collected: { $sum: "$paidAmount" } } },
                ])
            },
            getRecentPayments(limit: number = 10) {
                return this.find({ status: "paid" })
                    .populate("student", "name rollNumber")
                    .sort({ paidDate: -1 })
                    .limit(limit)
            },
            getOverdue(limit: number = 10) {
                return this.find({ status: { $in: ["overdue", "unpaid"] } })
                    .populate("student", "name rollNumber")
                    .sort({ dueDate: 1 })
                    .limit(limit)
            },
            getAll(limit: number = 200) {
                return this.find()
                    .populate("student", "name rollNumber")
                    .sort({ dueDate: -1 })
                    .limit(limit)
            },
            feeStructure(academicYear: string) {
                return this.aggregate([
                    { $match: { academicYear } },
                    { $group: { _id: "$type", totalAmount: { $sum: "$amount" }, avgAmount: { $avg: "$amount" }, count: { $sum: 1 } } },
                    { $sort: { totalAmount: -1 } },
                ])
            },
            feeTotals(academicYear: string) {
                return this.aggregate([
                    { $match: { academicYear } },
                    { $group: { _id: null, total: { $sum: "$amount" }, collected: { $sum: "$paidAmount" } } },
                ])
            },
            monthlyCollection(academicYear: string) {
                return this.aggregate([
                    { $match: { academicYear, status: "paid" } },
                    {
                        $group: {
                            _id: "$month",
                            total: { $sum: "$paidAmount" },
                            count: { $sum: 1 },
                        }
                    },
                    { $sort: { _id: 1 } },
                ])
            },
            paymentMethodBreakdown(academicYear: string) {
                return this.aggregate([
                    { $match: { academicYear, paymentMethod: { $ne: null } } },
                    {
                        $group: {
                            _id: "$paymentMethod",
                            total: { $sum: "$paidAmount" },
                            count: { $sum: 1 },
                        }
                    },
                    { $sort: { total: -1 } },
                ])
            },
            topDefaulters(academicYear: string, limit: number = 10) {
                return this.aggregate([
                    { $match: { academicYear, status: { $in: ["overdue", "unpaid"] } } },
                    {
                        $group: {
                            _id: "$student",
                            totalDue: { $sum: "$amount" },
                            count: { $sum: 1 },
                        }
                    },
                    { $sort: { totalDue: -1 } },
                    { $limit: limit },
                    { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "student" } },
                    { $unwind: "$student" },
                    {
                        $project: {
                            studentName: "$student.name",
                            rollNumber: "$student.rollNumber",
                            totalDue: 1,
                            count: 1,
                        }
                    },
                ])
            },
            classWiseFees(academicYear: string) {
                return this.aggregate([
                    { $match: { academicYear } },
                    { $lookup: { from: "students", localField: "student", foreignField: "_id", as: "studentData" } },
                    { $unwind: "$studentData" },
                    { $lookup: { from: "classes", localField: "studentData.classId", foreignField: "_id", as: "class" } },
                    { $unwind: "$class" },
                    {
                        $group: {
                            _id: { classId: "$class._id", className: "$class.name", section: "$class.section" },
                            totalFees: { $sum: "$amount" },
                            collected: { $sum: "$paidAmount" },
                            studentCount: { $addToSet: "$student" },
                        }
                    },
                    {
                        $project: {
                            className: { $concat: ["$_id.className", " ", "$_id.section"] },
                            totalFees: 1,
                            collected: 1,
                            pending: { $subtract: ["$totalFees", "$collected"] },
                            studentCount: { $size: "$studentCount" },
                        }
                    },
                    { $sort: { "_id.className": 1 } },
                ])
            },
        },
    }
)


// ============= INDEXES =============
feeSchema.index({ student: 1, academicYear: 1 })
feeSchema.index({ status: 1 })
feeSchema.index({ dueDate: 1 })
feeSchema.index({ type: 1 })


const y = () => mongoose.model("Fee", feeSchema)
export const FeeModel = mongoose.models.Fee as ReturnType<typeof y> || y()
