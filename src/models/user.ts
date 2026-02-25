import mongoose, { Schema, type Document, type Model } from "mongoose"
import bcrypt from "bcryptjs"

// ============= SCHEMA DEFINITION =============
const userSchema = new Schema<IUser>(
    {
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
        password: {
            type: String,
            required: true,
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
        },
        emailVerified: {
            type: Boolean,
            default: false,
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
    { timestamps: true }
)

// ============= STATIC METHODS =============
userSchema.statics.findByEmail = function (email: string) {
    return this.findOne({ email: email.toLowerCase() })
}

// ============= INSTANCE METHODS =============
userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password)
}

// ============= MIDDLEWARE =============
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 12)
})

// ============= INDEXES =============
userSchema.index({ email: 1 })
userSchema.index({ resetPasswordToken: 1 })
userSchema.index({ emailVerificationToken: 1 })

// ============= TYPES =============
interface IUser extends Document {
    name: string
    email: string
    password: string
    role: "admin" | "principal" | "teacher" | "student" | "parent"
    image?: string
    emailVerified: boolean
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
}

export const User =
    (mongoose.models.User as IUserModel) ||
    mongoose.model<IUser, IUserModel>("User", userSchema)
export type { IUser, IUserModel }
