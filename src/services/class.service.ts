import 'server-only'

import { cache } from 'react'
import { ClassModel } from "@/models/class"
import { connectDB, pop, sid } from '@/lib/db'

export class Class {
    static async getActive() {
        await connectDB()
        const classes = await ClassModel.getActive()

        return classes.map((c) => ({
            _id: sid(c),
            name: c.name,
            section: c.section,
            grade: c.grade,
            academicYear: c.academicYear,
            classTeacherName: pop(c.classTeacher, "name") || "Unassigned",
            studentCount: c.studentCount,
            maxStudents: c.maxStudents,
            room: c.room ?? "",
            subjects: c.subjects,
            status: c.status,
        }))
    }

    static async getAll() {
        await connectDB()
        const classes = await ClassModel.getAll()

        return classes.map((c) => ({
            _id: sid(c),
            name: c.name,
            section: c.section,
            grade: c.grade,
            academicYear: c.academicYear,
            classTeacherName: pop(c.classTeacher, "name") || "Unassigned",
            studentCount: c.studentCount,
            maxStudents: c.maxStudents,
            room: c.room ?? "",
            subjects: c.subjects,
            status: c.status,
        }))
    }

    static countActive = cache(async () => {
        await connectDB()
        return ClassModel.countActive()
    })

    static async getOptions() {
        await connectDB()
        const classes = await ClassModel
            .find({ status: "active" })
            .select("name section")
            .sort({ grade: 1, section: 1 })
            .lean()

        return classes.map((c) => ({
            _id: sid(c),
            name: c.name,
            section: c.section,
        }))
    }

    static capacityUtilization = cache(async () => {
        await connectDB()
        const raw = await ClassModel.capacityUtilization()
        return raw.map((r) => ({
            className: `${r.name} ${r.section}`,
            grade: r.grade as number,
            studentCount: r.studentCount as number,
            maxStudents: r.maxStudents as number,
            utilization: r.utilization as number,
        }))
    })

    static gradeDistribution = cache(async () => {
        await connectDB()
        const raw = await ClassModel.gradeDistribution()
        return raw.map((r) => ({
            grade: r._id as number,
            sections: r.sections as number,
            totalStudents: r.totalStudents as number,
            totalCapacity: r.totalCapacity as number,
        }))
    })
}
