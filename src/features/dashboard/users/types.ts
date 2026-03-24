export type UserRole = "admin" | "principal" | "teacher" | "student" | "parent"

interface UserBase {
    role: UserRole
    id: string
    name: string
    email: string
    phone: string
    address: string
}

export interface AdminUser extends UserBase {
    role: "admin"
    permissionLevel: "super" | "standard"
    status: "active" | "inactive"
}

export interface PrincipalUser extends UserBase {
    role: "principal"
    schoolName: string
    joinedDate: string
    status: "active" | "inactive"
}

export interface TeacherUser extends UserBase {
    role: "teacher"
    schoolId: string
    subject: string
    classes: string[]
    joinedDate: string
}

export interface StudentUser extends UserBase {
    role: "student"
    class: string
    dob: string
}

export interface ParentUser extends UserBase {
    role: "parent"
    relation: "father" | "mother" | "guardian"
    children: string[]
    status: "active" | "inactive"
}

export type AnyUser = AdminUser | PrincipalUser | TeacherUser | StudentUser | ParentUser

export interface GetUsersParams {
    role: UserRole
    search?: string
    page: number
    pageSize: number
    sort: string
    order: "asc" | "desc"
}

export interface GetUsersResult {
    data: AnyUser[]
    total: number
    pageCount: number
}
