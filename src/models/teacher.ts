import mongoose, { Schema } from "mongoose"

// ============= SCHEMA DEFINITION =============
const teacherSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        department: {
            type: String,
            required: true,
            trim: true,
        },
        qualification: {
            type: String,
            trim: true,
        },
        joinDate: {
            type: Date,
            default: Date.now,
        },
        image: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: ["active", "on-leave", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,

        statics: {
            getAll() {
                return this.find().sort({ name: 1 })
            },
            countActive() {
                return this.countDocuments({ status: "active" })
            },
            departmentDistribution() {
                return this.aggregate([
                    { $group: { _id: "$department", count: { $sum: 1 } } },
                    { $sort: { count: -1 } },
                ])
            },
            subjectCoverage() {
                return this.aggregate([
                    {
                        $group: {
                            _id: "$subject",
                            count: { $sum: 1 },
                            activeCount: { $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] } },
                        }
                    },
                    { $sort: { _id: 1 } },
                ])
            },
            statusBreakdown() {
                return this.aggregate([
                    { $group: { _id: "$status", count: { $sum: 1 } } },
                    { $sort: { count: -1 } },
                ])
            },
        },
    }
)


// ============= INDEXES =============
teacherSchema.index({ department: 1 })
teacherSchema.index({ subject: 1 })
teacherSchema.index({ status: 1 })


const y = () => mongoose.model("Teacher", teacherSchema)
export const TeacherModel = mongoose.models.Teacher as ReturnType<typeof y> || y()
