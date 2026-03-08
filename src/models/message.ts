import mongoose, { Schema } from "mongoose"
import "./user"

// ============= SCHEMA DEFINITION =============

const messageSchema = new Schema(
    {
        conversation: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
            index: true,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000,
        },
        type: {
            type: String,
            enum: ["text", "image", "file", "system"],
            default: "text",
        },
        attachments: [
            {
                name: { type: String, required: true },
                url: { type: String, required: true },
                type: { type: String, required: true },
                size: { type: Number },
            },
        ],
        readBy: [
            {
                user: { type: Schema.Types.ObjectId, ref: "User" },
                readAt: { type: Date, default: Date.now },
            },
        ],
        replyTo: {
            type: Schema.Types.ObjectId,
            ref: "Message",
            default: null,
        },
        isEdited: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
        },
        updatedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,

        // ============= STATIC METHODS =============
        statics: {
            getByConversation(conversationId: string, page: number = 1, limit: number = 50) {
                const skip = (page - 1) * limit
                return this.find({ conversation: conversationId, isDeleted: false })
                    .populate("sender", "name image role")
                    .populate("replyTo", "content sender")
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
            },

            countByConversation(conversationId: string) {
                return this.countDocuments({ conversation: conversationId, isDeleted: false })
            },

            getRecent(userId: string, limit: number = 20) {
                return this.find({ sender: userId, isDeleted: false })
                    .populate("conversation", "name type")
                    .sort({ createdAt: -1 })
                    .limit(limit)
            },

            messageTrend(months: number = 6) {
                const startDate = new Date()
                startDate.setMonth(startDate.getMonth() - months)
                return this.aggregate([
                    { $match: { createdAt: { $gte: startDate }, isDeleted: false } },
                    {
                        $group: {
                            _id: {
                                month: { $month: "$createdAt" },
                                year: { $year: "$createdAt" },
                            },
                            count: { $sum: 1 },
                        },
                    },
                    { $sort: { "_id.year": 1, "_id.month": 1 } },
                ])
            },

            typeCounts() {
                return this.aggregate([
                    { $match: { isDeleted: false } },
                    { $group: { _id: "$type", count: { $sum: 1 } } },
                ])
            },

            topSenders(limit: number = 10) {
                return this.aggregate([
                    { $match: { isDeleted: false } },
                    { $group: { _id: "$sender", count: { $sum: 1 } } },
                    { $sort: { count: -1 } },
                    { $limit: limit },
                    {
                        $lookup: {
                            from: "users",
                            localField: "_id",
                            foreignField: "_id",
                            as: "user",
                        },
                    },
                    { $unwind: "$user" },
                    {
                        $project: {
                            _id: 1,
                            count: 1,
                            name: "$user.name",
                            role: "$user.role",
                            image: "$user.image",
                        },
                    },
                ])
            },

            dailyActivity(days: number = 30) {
                const startDate = new Date()
                startDate.setDate(startDate.getDate() - days)
                return this.aggregate([
                    { $match: { createdAt: { $gte: startDate }, isDeleted: false } },
                    {
                        $group: {
                            _id: {
                                hour: { $hour: "$createdAt" },
                            },
                            count: { $sum: 1 },
                        },
                    },
                    { $sort: { "_id.hour": 1 } },
                ])
            },

            searchMessages(conversationId: string, query: string, limit: number = 20) {
                return this.find({
                    conversation: conversationId,
                    isDeleted: false,
                    content: { $regex: query, $options: "i" },
                })
                    .populate("sender", "name image role")
                    .sort({ createdAt: -1 })
                    .limit(limit)
            },
        },
    }
)

// ============= INDEXES =============
messageSchema.index({ conversation: 1, createdAt: -1 })
messageSchema.index({ sender: 1, createdAt: -1 })
messageSchema.index({ "readBy.user": 1 })
messageSchema.index({ content: "text" })

const y = () => mongoose.model("Chat", messageSchema)
export const ChatModel = (mongoose.models.Chat as ReturnType<typeof y>) || y()
