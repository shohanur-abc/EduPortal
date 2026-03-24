"use client"

import * as React from "react"
import { z } from "zod"
import { Button, FormInput, FormTextarea, Select } from "@/components/molecules"
import { MutationFormSheet } from "@/components/molecules/mutation-form-sheet"
import { Plus } from "@/lib/icon"
import { createUser } from "@/services/users"
import type { UserRole } from "./types"

const addUserSchema = z.object({
    role: z.enum(["admin", "principal", "teacher", "student", "parent"]),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone: z.string().optional(),
    address: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.enum(["male", "female", "other"]).optional(),

    permissionLevel: z.enum(["super", "standard"]).optional(),
    status: z.enum(["active", "inactive"]).optional(),
    schoolName: z.string().optional(),

    relation: z.enum(["father", "mother", "guardian"]).optional(),
    children: z.string().optional(),

    subject: z.string().optional(),
    department: z.string().optional(),
    qualification: z.string().optional(),
    joinDate: z.string().optional(),
    teacherStatus: z.enum(["active", "on-leave", "inactive"]).optional(),

    rollNumber: z.string().optional(),
    classId: z.string().optional(),
    section: z.string().optional(),
    guardianName: z.string().optional(),
    guardianPhone: z.string().optional(),
    guardianEmail: z.string().optional(),
    studentStatus: z.enum(["active", "inactive", "graduated", "transferred"]).optional(),
})

type AddUserFormData = z.infer<typeof addUserSchema>

interface AddUserSheetProps {
    defaultRole: UserRole
    classOptions: Array<{ value: string; label: string }>
}

const defaultValues: AddUserFormData = {
    role: "teacher",
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: undefined,

    permissionLevel: "standard",
    status: "active",
    schoolName: "",

    relation: "guardian",
    children: "",

    subject: "",
    department: "",
    qualification: "",
    joinDate: "",
    teacherStatus: "active",

    rollNumber: "",
    classId: "",
    section: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    studentStatus: "active",
}

export function AddUserSheet({ defaultRole, classOptions }: AddUserSheetProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <Button size="sm" onClick={() => setOpen(true)} leftIcon={<Plus className="size-4" />}>
                Add User
            </Button>

            <MutationFormSheet<AddUserFormData>
                open={open}
                onOpenChange={setOpen}
                title="Add User"
                description="Create a new user with role-specific details"
                schema={addUserSchema}
                defaultValues={{ ...defaultValues, role: defaultRole }}
                submitLabel="Create"
                onSubmit={createUser}
            >
                {(form) => {
                    const role = form.watch("role")

                    return (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <Select
                                    name="role"
                                    label="Role"
                                    options={[
                                        { value: "admin", label: "Admin" },
                                        { value: "principal", label: "Principal" },
                                        { value: "teacher", label: "Teacher" },
                                        { value: "student", label: "Student" },
                                        { value: "parent", label: "Parent" },
                                    ]}
                                />
                                <Select
                                    name="gender"
                                    label="Gender"
                                    placeholder="Select gender"
                                    options={[
                                        { value: "male", label: "Male" },
                                        { value: "female", label: "Female" },
                                        { value: "other", label: "Other" },
                                    ]}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormInput name="name" label="Full Name" placeholder="Enter full name" />
                                <FormInput name="email" label="Email" type="email" placeholder="Enter email" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormInput name="password" label="Password" type="password" placeholder="Minimum 8 characters" />
                                <FormInput name="phone" label="Phone" placeholder="Enter phone" />
                            </div>

                            <FormInput name="address" label="Address" placeholder="Enter address" />

                            <div className="grid grid-cols-2 gap-4">
                                <FormInput name="dateOfBirth" label="Date of Birth" type="date" />
                                <Select
                                    name="status"
                                    label="Status"
                                    options={[
                                        { value: "active", label: "Active" },
                                        { value: "inactive", label: "Inactive" },
                                    ]}
                                />
                            </div>

                            {(role === "admin" || role === "principal") && (
                                <div className="grid grid-cols-2 gap-4">
                                    <Select
                                        name="permissionLevel"
                                        label="Permission Level"
                                        options={[
                                            { value: "standard", label: "Standard" },
                                            { value: "super", label: "Super" },
                                        ]}
                                    />
                                    <FormInput name="schoolName" label="School Name" placeholder="Enter school name" />
                                </div>
                            )}

                            {role === "parent" && (
                                <>
                                    <Select
                                        name="relation"
                                        label="Relation"
                                        options={[
                                            { value: "father", label: "Father" },
                                            { value: "mother", label: "Mother" },
                                            { value: "guardian", label: "Guardian" },
                                        ]}
                                    />
                                    <FormTextarea name="children" label="Children" placeholder="Comma-separated names" />
                                </>
                            )}

                            {role === "teacher" && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormInput name="subject" label="Subject" placeholder="Enter subject" />
                                        <FormInput name="department" label="Department" placeholder="Enter department" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormInput name="qualification" label="Qualification" placeholder="Enter qualification" />
                                        <FormInput name="joinDate" label="Join Date" type="date" />
                                    </div>
                                    <Select
                                        name="teacherStatus"
                                        label="Teacher Status"
                                        options={[
                                            { value: "active", label: "Active" },
                                            { value: "on-leave", label: "On Leave" },
                                            { value: "inactive", label: "Inactive" },
                                        ]}
                                    />
                                </>
                            )}

                            {role === "student" && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormInput name="rollNumber" label="Roll Number" placeholder="Enter roll number" />
                                        <Select
                                            name="classId"
                                            label="Class"
                                            placeholder="Select class"
                                            options={classOptions}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormInput name="section" label="Section" placeholder="Enter section" />
                                        <Select
                                            name="studentStatus"
                                            label="Student Status"
                                            options={[
                                                { value: "active", label: "Active" },
                                                { value: "inactive", label: "Inactive" },
                                                { value: "graduated", label: "Graduated" },
                                                { value: "transferred", label: "Transferred" },
                                            ]}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormInput name="guardianName" label="Guardian Name" placeholder="Enter guardian name" />
                                        <FormInput name="guardianPhone" label="Guardian Phone" placeholder="Enter guardian phone" />
                                    </div>
                                    <FormInput name="guardianEmail" label="Guardian Email" type="email" placeholder="Enter guardian email" />
                                </>
                            )}
                        </>
                    )
                }}
            </MutationFormSheet>
        </>
    )
}
