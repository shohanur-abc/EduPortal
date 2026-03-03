import mongoose, { Schema } from "mongoose"
import "./student"
import "./class"
import "./user"

// ============= SCHEMA DEFINITION =============
const attendanceSchema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        classId: {
            type: Schema.Types.ObjectId,
            ref: "Class",
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["present", "absent", "late", "excused"],
            required: true,
        },
        markedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        remarks: {
            type: String,
        },
    },
    {
        timestamps: true,

        statics: {
            stats() {
                return this.aggregate([{
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 }
                    }
                }])
            },
            getRecent(limit: number = 10) {
                return this.find()
                    .populate("student", "name rollNumber")
                    .populate("classId", "name section")
                    .sort({ date: -1 })
                    .limit(limit)
            },
            getAll(limit: number = 200) {
                return this.find()
                    .populate("student", "name rollNumber")
                    .populate("classId", "name section")
                    .sort({ date: -1 })
                    .limit(limit)
            },
            todayStats() {
                const todayStart = new Date()
                todayStart.setHours(0, 0, 0, 0)
                const todayEnd = new Date()
                todayEnd.setHours(23, 59, 59, 999)
                return this.aggregate([
                    { $match: { date: { $gte: todayStart, $lte: todayEnd } } },
                    { $group: { _id: "$status", count: { $sum: 1 } } },
                ])
            },
            reportByDateStatus(limit: number = 100) {
                return this.aggregate([
                    { $group: { _id: { status: "$status", date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } }, count: { $sum: 1 } } },
                    { $sort: { "_id.date": -1 } },
                    { $limit: limit },
                ])
            },
            weeklyTrend(weeks: number = 8) {
                const startDate = new Date()
                startDate.setDate(startDate.getDate() - weeks * 7)
                return this.aggregate([
                    { $match: { date: { $gte: startDate } } },
                    {
                        $group: {
                            _id: {
                                week: { $isoWeek: "$date" },
                                year: { $isoWeekYear: "$date" },
                                status: "$status",
                            },
                            count: { $sum: 1 },
                        }
                    },
                    { $sort: { "_id.year": 1, "_id.week": 1 } },
                ])
            },
            classWiseStats() {
                return this.aggregate([
                    { $lookup: { from: "classes", localField: "classId", foreignField: "_id", as: "class" } },
                    { $unwind: "$class" },
                    {
                        $group: {
                            _id: { classId: "$classId", className: "$class.name", section: "$class.section" },
                            total: { $sum: 1 },
                            present: { $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] } },
                            absent: { $sum: { $cond: [{ $eq: ["$status", "absent"] }, 1, 0] } },
                            late: { $sum: { $cond: [{ $eq: ["$status", "late"] }, 1, 0] } },
                            excused: { $sum: { $cond: [{ $eq: ["$status", "excused"] }, 1, 0] } },
                        }
                    },
                    { $sort: { "_id.className": 1, "_id.section": 1 } },
                ])
            },
            topAbsentees(limit: number = 10) {
                return this.aggregate([
                    { $match: { status: { $in: ["absent", "late"] } } },
                    { $group: { _id: "$student", absences: { $sum: 1 } } },
                    { $sort: { absences: -1 } },
                    { $limit: limit },
                    { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "student" } },
                    { $unwind: "$student" },
                    { $lookup: { from: "classes", localField: "student.classId", foreignField: "_id", as: "class" } },
                    { $unwind: { path: "$class", preserveNullAndEmptyArrays: true } },
                    {
                        $project: {
                            studentName: "$student.name",
                            rollNumber: "$student.rollNumber",
                            className: { $concat: ["$class.name", " ", "$class.section"] },
                            absences: 1,
                        }
                    },
                ])
            },
            monthlySummary(months: number = 6) {
                const startDate = new Date()
                startDate.setMonth(startDate.getMonth() - months)
                return this.aggregate([
                    { $match: { date: { $gte: startDate } } },
                    {
                        $group: {
                            _id: {
                                month: { $month: "$date" },
                                year: { $year: "$date" },
                                status: "$status",
                            },
                            count: { $sum: 1 },
                        }
                    },
                    { $sort: { "_id.year": 1, "_id.month": 1 } },
                ])
            },
            attendanceRate() {
                return this.aggregate([
                    {
                        $group: {
                            _id: null,
                            total: { $sum: 1 },
                            present: { $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] } },
                        }
                    },
                    {
                        $project: {
                            rate: { $multiply: [{ $divide: ["$present", "$total"] }, 100] },
                            total: 1,
                            present: 1,
                        }
                    },
                ])
            },
        },
        query: {
            // Add any custom query helpers here if needed in the future
        },
        methods: {
            // Add any instance methods here if needed in the future
        }
    },
)


// ============= INDEXES =============
attendanceSchema.index({ student: 1, date: 1 }, { unique: true })
attendanceSchema.index({ classId: 1, date: 1 })
attendanceSchema.index({ status: 1 })
attendanceSchema.index({ date: -1 })


const y = () => mongoose.model("Attendance", attendanceSchema)
export const AttendanceModel = mongoose.models.Attendance as ReturnType<typeof y> || y()

