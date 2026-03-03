import mongoose, { Schema } from "mongoose"
import "./teacher"

// ============= SCHEMA DEFINITION =============
const classSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        section: {
            type: String,
            required: true,
            trim: true,
        },
        grade: {
            type: Number,
            required: true,
        },
        academicYear: {
            type: String,
            required: true,
        },
        classTeacher: {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
        },
        studentCount: {
            type: Number,
            default: 0,
        },
        maxStudents: {
            type: Number,
            default: 40,
        },
        subjects: {
            type: [String],
            default: [],
        },
        schedule: {
            type: String,
        },
        room: {
            type: String,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,

        statics: {
            getActive() {
                return this.find({ status: "active" })
                    .populate("classTeacher", "name")
                    .sort({ grade: 1, section: 1 })
            },
            getAll() {
                return this.find()
                    .populate("classTeacher", "name")
                    .sort({ grade: 1, section: 1 })
            },
            countActive() {
                return this.countDocuments({ status: "active" })
            },
            capacityUtilization() {
                return this.aggregate([
                    { $match: { status: "active" } },
                    {
                        $project: {
                            name: 1,
                            section: 1,
                            grade: 1,
                            studentCount: 1,
                            maxStudents: 1,
                            utilization: {
                                $round: [{ $multiply: [{ $divide: ["$studentCount", "$maxStudents"] }, 100] }, 1],
                            },
                        }
                    },
                    { $sort: { grade: 1, section: 1 } },
                ])
            },
            gradeDistribution() {
                return this.aggregate([
                    { $match: { status: "active" } },
                    {
                        $group: {
                            _id: "$grade",
                            sections: { $sum: 1 },
                            totalStudents: { $sum: "$studentCount" },
                            totalCapacity: { $sum: "$maxStudents" },
                        }
                    },
                    { $sort: { _id: 1 } },
                ])
            },
        },
    }
)


// ============= INDEXES =============
classSchema.index({ grade: 1, section: 1, academicYear: 1 })
classSchema.index({ classTeacher: 1 })
classSchema.index({ status: 1 })


const y = () => mongoose.model("Class", classSchema)
export const ClassModel = mongoose.models.Class as ReturnType<typeof y> || y()
