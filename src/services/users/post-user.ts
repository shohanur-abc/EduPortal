"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"
import type { ActionResult } from "@/types/response"

const createUserSchema = z.object({
    role: z.enum(["admin", "principal", "teacher", "student", "parent"]),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone: z.string().optional().or(z.literal("")),
    address: z.string().optional().or(z.literal("")),
    dateOfBirth: z.string().optional().or(z.literal("")),
    gender: z.enum(["male", "female", "other"]).optional(),

    permissionLevel: z.enum(["super", "standard"]).optional(),
    status: z.enum(["active", "inactive"]).optional(),
    schoolName: z.string().optional().or(z.literal("")),

    relation: z.enum(["father", "mother", "guardian"]).optional(),
    children: z.string().optional().or(z.literal("")),

    subject: z.string().optional().or(z.literal("")),
    department: z.string().optional().or(z.literal("")),
    qualification: z.string().optional().or(z.literal("")),
    joinDate: z.string().optional().or(z.literal("")),
    teacherStatus: z.enum(["active", "on-leave", "inactive"]).optional(),

    rollNumber: z.string().optional().or(z.literal("")),
    classId: z.string().optional().or(z.literal("")),
    section: z.string().optional().or(z.literal("")),
    guardianName: z.string().optional().or(z.literal("")),
    guardianPhone: z.string().optional().or(z.literal("")),
    guardianEmail: z.string().email("Guardian email must be valid").optional().or(z.literal("")),
    studentStatus: z.enum(["active", "inactive", "graduated", "transferred"]).optional(),
}).superRefine((value, context) => {
    if (value.role === "teacher") {
        if (!value.subject?.trim()) {
            context.addIssue({ code: z.ZodIssueCode.custom, path: ["subject"], message: "Subject is required for teacher" })
        }
        if (!value.department?.trim()) {
            context.addIssue({ code: z.ZodIssueCode.custom, path: ["department"], message: "Department is required for teacher" })
        }
    }

    if (value.role === "student") {
        if (!value.rollNumber?.trim()) {
            context.addIssue({ code: z.ZodIssueCode.custom, path: ["rollNumber"], message: "Roll number is required for student" })
        }
        if (!value.classId?.trim()) {
            context.addIssue({ code: z.ZodIssueCode.custom, path: ["classId"], message: "Class is required for student" })
        }
        if (!value.section?.trim()) {
            context.addIssue({ code: z.ZodIssueCode.custom, path: ["section"], message: "Section is required for student" })
        }
        if (!value.guardianName?.trim()) {
            context.addIssue({ code: z.ZodIssueCode.custom, path: ["guardianName"], message: "Guardian name is required for student" })
        }
        if (!value.guardianPhone?.trim()) {
            context.addIssue({ code: z.ZodIssueCode.custom, path: ["guardianPhone"], message: "Guardian phone is required for student" })
        }
    }
})

const toDate = (value?: string) => {
    if (!value?.trim()) return undefined
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? undefined : date
}

const parseChildren = (raw?: string) => {
    if (!raw) return []
    return raw
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
}

export async function createUser(raw: unknown): Promise<ActionResult> {
    const parsed = createUserSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0]?.message || "Invalid form data")

    const payload = parsed.data
    await db.connect()

    const existingUser = await db.user.findOne({ email: payload.email }).lean().exec()
    if (existingUser) return error("A user with this email already exists")

    let createdUserId: string | null = null

    try {
        const user = await db.user.create({
            name: payload.name,
            email: payload.email,
            password: payload.password,
            role: payload.role,
            phone: payload.phone || "",
            address: payload.address || "",
            dateOfBirth: toDate(payload.dateOfBirth) || null,
            gender: payload.gender,
            status: payload.status || "active",
            permissionLevel: payload.permissionLevel || "standard",
            schoolName: payload.schoolName || "",
            joinedDate: toDate(payload.joinDate) || undefined,
            relation: payload.relation || "guardian",
            children: parseChildren(payload.children),
            emailVerified: payload.status === "active" ? new Date() : null,
        })

        createdUserId = String(user._id)

        if (payload.role === "teacher") {
            await db.teacher.create({
                userId: user._id,
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                subject: payload.subject,
                department: payload.department,
                qualification: payload.qualification,
                joinDate: toDate(payload.joinDate) || undefined,
                status: payload.teacherStatus || "active",
            })
        }

        if (payload.role === "student") {
            await db.student.create({
                userId: user._id,
                name: payload.name,
                email: payload.email,
                rollNumber: payload.rollNumber,
                classId: payload.classId,
                section: payload.section,
                guardianName: payload.guardianName,
                guardianPhone: payload.guardianPhone,
                guardianEmail: payload.guardianEmail || undefined,
                dateOfBirth: toDate(payload.dateOfBirth) || undefined,
                gender: payload.gender,
                address: payload.address,
                status: payload.studentStatus || "active",
            })
        }

        revalidatePath(ROUTES.dashboard.users.root, "layout")
        return success("User created successfully", { data: { _id: createdUserId } })
    } catch {
        if (createdUserId) {
            await db.user.findByIdAndDelete(createdUserId).exec()
        }
        return error("Failed to create user")
    }
}
