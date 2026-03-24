"use server"

import { db } from "@/fatman"
import type { AnyUser, GetUsersParams, GetUsersResult } from "@/features/dashboard/users/types"

const EMPTY_VALUE = "—"

const TEACHER_SORT_MAP: Record<string, string> = {
    id: "_id",
    name: "name",
    email: "email",
    phone: "phone",
    schoolId: "_id",
    subject: "subject",
    joinedDate: "joinDate",
}

const STUDENT_SORT_MAP: Record<string, string> = {
    id: "_id",
    name: "name",
    email: "email",
    phone: "guardianPhone",
    address: "address",
    class: "section",
    dob: "dateOfBirth",
}

type SafeQueryParams = {
    page: number
    pageSize: number
    order: 1 | -1
    search?: string
}

const toDate = (value: Date | string | null | undefined) => {
    if (!value) return EMPTY_VALUE
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return EMPTY_VALUE
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    })
}

const getSafeParams = ({ page, pageSize, order, search }: GetUsersParams): SafeQueryParams => {
    const safePage = Number.isFinite(page) && page > 0 ? page : 1
    const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 10

    return {
        page: safePage,
        pageSize: safePageSize,
        order: order === "asc" ? 1 : -1,
        search: search?.trim(),
    }
}

const getSortField = (sort: string, map: Record<string, string>, fallback: string) => map[sort] || fallback

const withIdSearchExpr = (search: string) => ({
    $expr: {
        $regexMatch: {
            input: { $toString: "$_id" },
            regex: search,
            options: "i",
        },
    },
})

const buildFilter = (base: Record<string, unknown>, search: string | undefined, fields: string[]) => {
    if (!search) return base

    const regex = { $regex: search, $options: "i" }
    const searchFilters = fields.map((field) => ({ [field]: regex }))

    return {
        ...base,
        $or: [...searchFilters, withIdSearchExpr(search)],
    }
}

const toPageResult = (data: AnyUser[], total: number, pageSize: number): GetUsersResult => ({
    data,
    total,
    pageCount: Math.ceil(total / pageSize),
})

const toStatus = (value: unknown): "active" | "inactive" => value === "active" ? "active" : "inactive"

const buildClassesByTeacher = (classes: Array<{ classTeacher?: unknown; name?: string; section?: string }>) => {
    const classesByTeacherId = new Map<string, string[]>()

    classes.forEach((classItem) => {
        if (!classItem.classTeacher) return

        const teacherId = String(classItem.classTeacher)
        const label = [classItem.name, classItem.section].filter(Boolean).join(" ")

        if (!classesByTeacherId.has(teacherId)) {
            classesByTeacherId.set(teacherId, [])
        }

        if (label) {
            classesByTeacherId.get(teacherId)?.push(label)
        }
    })

    return classesByTeacherId
}

const getTeacherData = async ({ search, page, pageSize, order }: SafeQueryParams, sort: string): Promise<GetUsersResult> => {
    const filter = buildFilter({}, search, ["name", "email", "phone", "subject", "department"])

    const [teachers, total] = await Promise.all([
        db.teacher
            .find(filter)
            .sort({ [getSortField(sort, TEACHER_SORT_MAP, "name")]: order })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .lean()
            .exec(),
        db.teacher.countDocuments(filter).exec(),
    ])

    const teacherIds = teachers.map((teacher) => teacher._id)
    const classes = teacherIds.length
        ? await db.class
            .find({ classTeacher: { $in: teacherIds } })
            .select("name section classTeacher")
            .lean()
            .exec()
        : []

    const classesByTeacherId = buildClassesByTeacher(classes)

    const data: AnyUser[] = teachers.map((teacher) => {
        const teacherId = String(teacher._id)
        const assignedClasses = classesByTeacherId.get(teacherId) || []

        return {
            role: "teacher",
            id: teacherId,
            name: teacher.name || "Unknown Teacher",
            email: teacher.email || EMPTY_VALUE,
            phone: teacher.phone || EMPTY_VALUE,
            address: EMPTY_VALUE,
            schoolId: teacherId,
            subject: teacher.subject || teacher.department || EMPTY_VALUE,
            classes: assignedClasses.length ? assignedClasses : (teacher.department ? [teacher.department] : [EMPTY_VALUE]),
            joinedDate: toDate(teacher.joinDate || teacher.createdAt),
        }
    })

    return toPageResult(data, total, pageSize)
}

const getStudentData = async ({ search, page, pageSize, order }: SafeQueryParams, sort: string): Promise<GetUsersResult> => {
    const filter = buildFilter({}, search, ["name", "email", "rollNumber", "guardianName", "guardianPhone"])

    const [students, total] = await Promise.all([
        db.student
            .find(filter)
            .populate("classId", "name grade section")
            .sort({ [getSortField(sort, STUDENT_SORT_MAP, "name")]: order })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .lean()
            .exec(),
        db.student.countDocuments(filter).exec(),
    ])

    const data: AnyUser[] = students.map((student) => {
        const classInfo = student.classId as { name?: string; grade?: number; section?: string } | null
        const classLabel = classInfo?.name
            || (typeof classInfo?.grade === "number"
                ? `${classInfo.grade}${student.section ? `-${student.section}` : ""}`
                : (student.section || EMPTY_VALUE))

        return {
            role: "student",
            id: String(student._id),
            name: student.name || "Unknown Student",
            email: student.email || EMPTY_VALUE,
            phone: student.guardianPhone || EMPTY_VALUE,
            address: student.address || EMPTY_VALUE,
            class: classLabel,
            dob: toDate(student.dateOfBirth),
        }
    })

    return toPageResult(data, total, pageSize)
}

const toGenericUser = (user: {
    _id: unknown
    role?: string
    name?: string
    email?: string
    phone?: string
    address?: string
    emailVerified?: unknown
    status?: string
    permissionLevel?: string
    schoolName?: string
    joinedDate?: Date | string | null
    relation?: string
    children?: string[]
    createdAt?: Date | string | null
    dateOfBirth?: Date | string | null
}, defaultRole: GetUsersParams["role"]): AnyUser => {
    const roleValue = user.role || defaultRole
    const base = {
        id: String(user._id),
        name: user.name || "Unknown User",
        email: user.email || EMPTY_VALUE,
        phone: user.phone || EMPTY_VALUE,
        address: user.address || EMPTY_VALUE,
    }
    const status = toStatus(user.status || (user.emailVerified ? "active" : "inactive"))

    switch (roleValue) {
        case "admin": return {
            role: "admin",
            ...base,
            permissionLevel: user.permissionLevel === "super" ? "super" : "standard",
            status,
        }
        case "principal": return {
            role: "principal",
            ...base,
            schoolName: user.schoolName || EMPTY_VALUE,
            joinedDate: toDate(user.joinedDate || user.createdAt),
            status,
        }
        case "parent": return {
            role: "parent",
            ...base,
            relation: user.relation === "father" || user.relation === "mother" ? user.relation : "guardian",
            children: Array.isArray(user.children) ? user.children : [],
            status,
        }
        case "student": return {
            role: "student",
            ...base,
            class: EMPTY_VALUE,
            dob: toDate(user.dateOfBirth),
        }
        case "teacher":
        default: return {
            role: "teacher",
            ...base,
            schoolId: String(user._id),
            subject: EMPTY_VALUE,
            classes: [],
            joinedDate: toDate(user.createdAt),
        }
    }
}

const getDefaultRoleData = async (
    role: GetUsersParams["role"],
    { search, page, pageSize, order }: SafeQueryParams,
    sort: string,
): Promise<GetUsersResult> => {
    const safeSort = sort === "id" ? "_id" : sort
    const filter = buildFilter({ role }, search, ["name", "email"])

    const [users, total] = await Promise.all([
        db.user
            .find(filter)
            .sort({ [safeSort]: order })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .lean()
            .exec(),
        db.user.countDocuments(filter).exec(),
    ])

    const data: AnyUser[] = users.map((user) => toGenericUser(user, role))

    return toPageResult(data, total, pageSize)
}

export async function getTableData({
    role,
    search,
    page,
    pageSize,
    sort,
    order,
}: GetUsersParams): Promise<GetUsersResult> {
    await db.connect()

    const safeParams = getSafeParams({ role, search, page, pageSize, sort, order })

    switch (role) {
        case "teacher": return getTeacherData(safeParams, sort)
        case "student": return getStudentData(safeParams, sort)
        default: return getDefaultRoleData(role, safeParams, sort)
    }
}

export const getUsersTableData = getTableData
