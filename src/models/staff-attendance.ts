import mongoose, { Schema } from "mongoose"
import "./teacher"
import "./user"

const staffAttendanceSchema = new Schema(
    {
        entityId: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: "entityModel",
        },
        entityModel: {
            type: String,
            enum: ["Teacher", "User"],
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
            default: "",
        },
    },
    {
        timestamps: true,
    }
)

staffAttendanceSchema.index({ entityId: 1, entityModel: 1, date: 1 }, { unique: true })
staffAttendanceSchema.index({ date: -1 })
staffAttendanceSchema.index({ status: 1 })

const y = () => mongoose.model("StaffAttendance", staffAttendanceSchema)
export const StaffAttendanceModel = mongoose.models.StaffAttendance as ReturnType<typeof y> || y()
