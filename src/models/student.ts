import mongoose, { Schema } from "mongoose"

// ============= SCHEMA DEFINITION =============
const studentSchema = new Schema(
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
        rollNumber: {
            type: String,
            required: true,
            unique: true,
        },
        classId: {
            type: Schema.Types.ObjectId,
            ref: "Class",
            required: true,
        },
        section: {
            type: String,
            required: true,
            trim: true,
        },
        guardianName: {
            type: String,
            required: true,
            trim: true,
        },
        guardianPhone: {
            type: String,
            required: true,
        },
        guardianEmail: {
            type: String,
            lowercase: true,
        },
        dateOfBirth: {
            type: Date,
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
        },
        address: {
            type: String,
        },
        admissionDate: {
            type: Date,
            default: Date.now,
        },
        image: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: ["active", "inactive", "graduated", "transferred"],
            default: "active",
        },
    },
    {
        timestamps: true,
        statics: {
            class(studentId: string) {
                return this.findById(studentId).populate("classId", "name").select("classId")
            },
            getAll(limit?: number) {
                const q = this.find().sort({ rollNumber: -1 })
                return limit ? q.limit(limit) : q
            },
            getActive(limit?: number) {
                const q = this.find({ status: "active" }).sort({ rollNumber: 1 })
                return limit ? q.limit(limit) : q
            },
            getOptions() {
                return this.find({ status: "active" }).select("name rollNumber email").lean()
            },
            countActive() {
                return this.countDocuments({ status: "active" })
            },
            genderDistribution() {
                return this.aggregate([
                    { $match: { status: "active" } },
                    { $group: { _id: "$gender", count: { $sum: 1 } } },
                    { $sort: { count: -1 } },
                ])
            },
            classWiseCounts() {
                return this.aggregate([
                    { $match: { status: "active" } },
                    { $lookup: { from: "classes", localField: "classId", foreignField: "_id", as: "class" } },
                    { $unwind: "$class" },
                    {
                        $group: {
                            _id: { classId: "$classId", className: "$class.name", section: "$class.section", grade: "$class.grade" },
                            count: { $sum: 1 },
                            maleCount: { $sum: { $cond: [{ $eq: ["$gender", "male"] }, 1, 0] } },
                            femaleCount: { $sum: { $cond: [{ $eq: ["$gender", "female"] }, 1, 0] } },
                        }
                    },
                    { $sort: { "_id.grade": 1, "_id.section": 1 } },
                ])
            },
            admissionTrend(months: number = 12) {
                const startDate = new Date()
                startDate.setMonth(startDate.getMonth() - months)
                return this.aggregate([
                    { $match: { admissionDate: { $gte: startDate } } },
                    {
                        $group: {
                            _id: { month: { $month: "$admissionDate" }, year: { $year: "$admissionDate" } },
                            count: { $sum: 1 },
                        }
                    },
                    { $sort: { "_id.year": 1, "_id.month": 1 } },
                ])
            },
            statusBreakdown() {
                return this.aggregate([
                    { $group: { _id: "$status", count: { $sum: 1 } } },
                    { $sort: { count: -1 } },
                ])
            },
        },
        query: {
            name(name: string) {
                return this.where({ name: new RegExp(name, "i") })
            },
            email(email: string) {
                return this.where({ email: new RegExp(email, "i") })
            },
            rollNumber(rollNumber: string) {
                return this.where({ rollNumber: new RegExp(rollNumber, "i") })
            },
            status(status: string) {
                return this.where({ status })
            },
        },
    }
)



// ============= INDEXES =============
studentSchema.index({ classId: 1, section: 1 })
studentSchema.index({ status: 1 })



const y = () => mongoose.model("Student", studentSchema)
export const StudentModel = mongoose.models.Student as ReturnType<typeof y> || y()
