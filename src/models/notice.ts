import mongoose, { Schema } from "mongoose"
import "./user"

// ============= SCHEMA DEFINITION =============
const noticeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high", "urgent"],
            default: "medium",
        },
        targetAudience: {
            type: [String],
            enum: ["all", "admin", "teacher", "student", "parent"],
            default: ["all"],
        },
        publishDate: {
            type: Date,
            default: Date.now,
        },
        expiryDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "draft",
        },
        attachments: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,

        statics: {
            statusCounts() {
                return this.aggregate([
                    { $group: { _id: "$status", count: { $sum: 1 } } },
                ])
            },
            getAll(limit: number = 20) {
                return this.find()
                    .populate("author", "name")
                    .sort({ publishDate: -1 })
                    .limit(limit)
            },
            getRecent(limit: number = 10) {
                return this.find()
                    .populate("author", "name")
                    .sort({ publishDate: -1 })
                    .limit(limit)
            },
            priorityBreakdown() {
                return this.aggregate([
                    { $group: { _id: "$priority", count: { $sum: 1 } } },
                    { $sort: { count: -1 } },
                ])
            },
            audienceReach() {
                return this.aggregate([
                    { $unwind: "$targetAudience" },
                    { $group: { _id: "$targetAudience", count: { $sum: 1 } } },
                    { $sort: { count: -1 } },
                ])
            },
            publishTrend(months: number = 6) {
                const startDate = new Date()
                startDate.setMonth(startDate.getMonth() - months)
                return this.aggregate([
                    { $match: { publishDate: { $gte: startDate } } },
                    {
                        $group: {
                            _id: {
                                month: { $month: "$publishDate" },
                                year: { $year: "$publishDate" },
                            },
                            count: { $sum: 1 },
                            published: { $sum: { $cond: [{ $eq: ["$status", "published"] }, 1, 0] } },
                        }
                    },
                    { $sort: { "_id.year": 1, "_id.month": 1 } },
                ])
            },
            getExpiringSoon(days: number = 7) {
                const now = new Date()
                const soon = new Date()
                soon.setDate(soon.getDate() + days)
                return this.find({
                    status: "published",
                    expiryDate: { $gte: now, $lte: soon },
                }).populate("author", "name").sort({ expiryDate: 1 })
            },
        },
    }
)

// ============= INDEXES =============
noticeSchema.index({ status: 1, publishDate: -1 })
noticeSchema.index({ targetAudience: 1 })
noticeSchema.index({ priority: 1 })


const y = () => mongoose.model("Notice", noticeSchema)
export const NoticeModel = mongoose.models.Notice as ReturnType<typeof y> || y()
