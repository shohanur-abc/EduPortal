import mongoose, { Schema, type Document, type Model } from "mongoose"
import bcrypt from "bcryptjs"

// ============= SCHEMA DEFINITION =============

const accountSchema = new Schema<IAccount>(
    {
        type: { type: String, required: true },
        provider: { type: String, required: true },
        providerAccountId: { type: String, required: true },
    },
    { _id: false }
)

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            trim: true,
            default: "",
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            select: false,
            minlength: 8,
        },
        role: {
            type: String,
            enum: ["admin", "principal", "teacher", "student", "parent"],
            default: "student",
        },
        image: {
            type: String,
            default: null,
        },
        emailVerified: {
            type: Date,
            default: null,
        },
        accounts: {
            type: [accountSchema],
            default: [],
            select: false,
        },
        emailVerificationToken: {
            type: String,
            select: false,
        },
        emailVerificationExpires: {
            type: Date,
            select: false,
        },
        resetPasswordToken: {
            type: String,
            select: false,
        },
        resetPasswordExpires: {
            type: Date,
            select: false,
        },
    },
    {
        timestamps: true,
        statics: {
            findByEmail: function (email: string) {
                return this.findOne({ email: email.toLowerCase() })
            },
            getRecent: function (limit: number = 20) {
                return this.find().sort({ createdAt: -1 }).limit(limit)
            },
            roleCounts: function () {
                return this.aggregate([
                    { $group: { _id: "$role", count: { $sum: 1 } } },
                ])
            },
            getAll: function () {
                return this.find().sort({ role: 1, name: 1 })
            },
            registrationTrend: function (months: number = 6) {
                const startDate = new Date()
                startDate.setMonth(startDate.getMonth() - months)
                return this.aggregate([
                    { $match: { createdAt: { $gte: startDate } } },
                    {
                        $group: {
                            _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
                            count: { $sum: 1 },
                        }
                    },
                    { $sort: { "_id.year": 1, "_id.month": 1 } },
                ])
            },
            verificationStats: function () {
                return this.aggregate([
                    {
                        $group: {
                            _id: null,
                            total: { $sum: 1 },
                            verified: { $sum: { $cond: [{ $ne: ["$emailVerified", null] }, 1, 0] } },
                            unverified: { $sum: { $cond: [{ $eq: ["$emailVerified", null] }, 1, 0] } },
                        }
                    },
                ])
            },
        },
    }
)

// ============= STATIC METHODS =============
userSchema.statics.findByEmail = function (email: string) {
    return this.findOne({ email: email.toLowerCase() })
}

userSchema.statics.getRecent = function (limit: number = 20) {
    return this.find().sort({ createdAt: -1 }).limit(limit)
}

userSchema.statics.roleCounts = function () {
    return this.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } },
    ])
}

userSchema.statics.getAll = function () {
    return this.find().sort({ role: 1, name: 1 })
}

userSchema.statics.registrationTrend = function (months: number = 6) {
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - months)
    return this.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
            $group: {
                _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
                count: { $sum: 1 },
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
    ])
}

userSchema.statics.verificationStats = function () {
    return this.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                verified: { $sum: { $cond: [{ $ne: ["$emailVerified", null] }, 1, 0] } },
                unverified: { $sum: { $cond: [{ $eq: ["$emailVerified", null] }, 1, 0] } },
            }
        },
    ])
}

// ============= INSTANCE METHODS =============
userSchema.methods.comparePassword = async function (candidatePassword: string) {
    if (!this.password) return false
    return bcrypt.compare(candidatePassword, this.password)
}

// ============= MIDDLEWARE =============
userSchema.pre("save", async function () {
    if (!this.isModified("password") || !this.password) return
    this.password = await bcrypt.hash(this.password, 12)
})

// ============= INDEXES =============
userSchema.index({ email: 1 })
userSchema.index({ resetPasswordToken: 1 })
userSchema.index({ emailVerificationToken: 1 })
userSchema.index({ "accounts.provider": 1, "accounts.providerAccountId": 1 })

// ============= TYPES =============
interface IAccount {
    type: string
    provider: string
    providerAccountId: string
}

interface IUser extends Document {
    name: string
    email: string
    password?: string
    role: "admin" | "principal" | "teacher" | "student" | "parent"
    image?: string | null
    emailVerified: Date | null
    accounts: IAccount[]
    emailVerificationToken?: string
    emailVerificationExpires?: Date
    resetPasswordToken?: string
    resetPasswordExpires?: Date
    createdAt: Date
    updatedAt: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}

interface IUserModel extends Model<IUser> {
    findByEmail(email: string): Promise<IUser | null>
    getRecent(limit?: number): ReturnType<Model<IUser>["find"]>
    roleCounts(): Promise<{ _id: string; count: number }[]>
    getAll(): ReturnType<Model<IUser>["find"]>
}

export const UserModel =
    (mongoose.models.User as IUserModel) ||
    mongoose.model<IUser, IUserModel>("User", userSchema)
export type { IUser, IUserModel }
