import mongoose, { Schema } from "mongoose"
import "./user"
import "./message"

// ============= SCHEMA DEFINITION =============

const conversationSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            default: "",
        },
        type: {
            type: String,
            enum: ["direct", "group"],
            default: "direct",
        },
        participants: [
            {
                user: { type: Schema.Types.ObjectId, ref: "User", required: true },
                role: {
                    type: String,
                    enum: ["admin", "member"],
                    default: "member",
                },
                joinedAt: { type: Date, default: Date.now },
                lastReadAt: { type: Date, default: Date.now },
            },
        ],
        description: {
            type: String,
            trim: true,
            default: "",
            maxlength: 500,
        },
        avatar: {
            type: String,
            default: null,
        },
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
            default: null,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
        pinnedMessages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
    },
    {
        timestamps: true,

        // ============= STATIC METHODS =============
        statics: {
            getByUser(userId: string) {
                return this.find({
                    "participants.user": userId,
                    isArchived: false,
                })
                    .populate("participants.user", "name image role email")
                    .populate("lastMessage", "content sender createdAt type")
                    .populate("createdBy", "name image")
                    .sort({ updatedAt: -1 })
            },

            getById(id: string) {
                return this.findById(id)
                    .populate("participants.user", "name image role email")
                    .populate("lastMessage", "content sender createdAt type")
                    .populate("createdBy", "name image")
                    .populate({
                        path: "pinnedMessages",
                        populate: { path: "sender", select: "name image" },
                    })
            },

            findDirect(userId1: string, userId2: string) {
                return this.findOne({
                    type: "direct",
                    "participants.user": { $all: [userId1, userId2] },
                    $expr: { $eq: [{ $size: "$participants" }, 2] },
                })
            },

            getAll(limit: number = 50) {
                return this.find()
                    .populate("participants.user", "name image role")
                    .populate("lastMessage", "content sender createdAt")
                    .populate("createdBy", "name")
                    .sort({ updatedAt: -1 })
                    .limit(limit)
            },

            getRecent(limit: number = 10) {
                return this.find({ isArchived: false })
                    .populate("participants.user", "name image role")
                    .populate("lastMessage", "content sender createdAt")
                    .sort({ updatedAt: -1 })
                    .limit(limit)
            },

            typeCounts() {
                return this.aggregate([
                    { $group: { _id: "$type", count: { $sum: 1 } } },
                ])
            },

            participantStats() {
                return this.aggregate([
                    { $match: { isArchived: false } },
                    {
                        $project: {
                            type: 1,
                            participantCount: { $size: "$participants" },
                        },
                    },
                    {
                        $group: {
                            _id: "$type",
                            avgParticipants: { $avg: "$participantCount" },
                            maxParticipants: { $max: "$participantCount" },
                            total: { $sum: 1 },
                        },
                    },
                ])
            },

            activityTrend(months: number = 6) {
                const startDate = new Date()
                startDate.setMonth(startDate.getMonth() - months)
                return this.aggregate([
                    { $match: { createdAt: { $gte: startDate } } },
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

            searchConversations(userId: string, query: string) {
                return this.find({
                    "participants.user": userId,
                    isArchived: false,
                    $or: [
                        { name: { $regex: query, $options: "i" } },
                        { description: { $regex: query, $options: "i" } },
                    ],
                })
                    .populate("participants.user", "name image role")
                    .populate("lastMessage", "content sender createdAt")
                    .sort({ updatedAt: -1 })
            },
        },

        // ============= INSTANCE METHODS =============
        methods: {
            isParticipant(userId: string) {
                return this.participants.some(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (p: any) => String(p.user._id ?? p.user) === userId
                )
            },
            isAdmin(userId: string) {
                return this.participants.some(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (p: any) => String(p.user._id ?? p.user) === userId && p.role === "admin"
                )
            },
        },
    }
)

// ============= MIDDLEWARE =============
conversationSchema.pre("save", function () {
    if (this.type === "direct" && this.participants.length !== 2) {
        throw new Error("Direct conversations must have exactly 2 participants")
    }
})

// ============= INDEXES =============
conversationSchema.index({ "participants.user": 1, updatedAt: -1 })
conversationSchema.index({ type: 1 })
conversationSchema.index({ createdBy: 1 })
conversationSchema.index({ name: "text", description: "text" })

const y = () => mongoose.model("Conversation", conversationSchema)
export const ConversationModel = (mongoose.models.Conversation as ReturnType<typeof y>) || y()
