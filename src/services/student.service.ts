import 'server-only'

import { cache } from 'react'
import { StudentModel } from "@/models/student"
import { fmtDate } from '@/lib/utils'
import { connectDB, sid } from '@/lib/db'

export class Student {
    static async getAll(limit?: number) {
        await connectDB()
        const students = await StudentModel.getAll(limit)

        return students.map((s) => ({
            _id: sid(s),
            name: s.name,
            email: s.email,
            rollNumber: s.rollNumber,
            section: s.section,
            guardianName: s.guardianName,
            guardianPhone: s.guardianPhone,
            status: s.status,
            gender: s.gender ?? "",
            dateOfBirth: fmtDate(s.dateOfBirth),
            admissionDate: fmtDate(s.admissionDate),
        }))
    }

    static async getActive(limit?: number) {
        await connectDB()
        const students = await StudentModel.getActive(limit)

        return students.map((s) => ({
            _id: sid(s),
            name: s.name,
            email: s.email,
            rollNumber: s.rollNumber,
            section: s.section,
            guardianName: s.guardianName,
            guardianPhone: s.guardianPhone,
            status: s.status,
            gender: s.gender ?? "",
            dateOfBirth: fmtDate(s.dateOfBirth),
            admissionDate: fmtDate(s.admissionDate),
        }))
    }

    static async getOptions() {
        await connectDB()
        const students = await StudentModel.getOptions()

        return students.map((s) => ({
            _id: sid(s),
            name: String(s.name),
            rollNumber: String(s.rollNumber),
        }))
    }

    static countActive = cache(async () => {
        await connectDB()
        return StudentModel.countActive()
    })

    static async getForClass(classSection: string) {
        await connectDB()
        const students = await StudentModel
            .find({ section: classSection, status: "active" })
            .sort({ rollNumber: 1 })
            .lean()

        return students.map((s) => ({
            _id: sid(s),
            name: s.name,
            rollNumber: s.rollNumber,
            section: s.section,
        }))
    }

    static genderDistribution = cache(async () => {
        await connectDB()
        const raw = await StudentModel.genderDistribution()
        return raw.map((r) => ({
            gender: (r._id as string) || "unspecified",
            count: r.count as number,
        }))
    })

    static classWiseCounts = cache(async () => {
        await connectDB()
        const raw = await StudentModel.classWiseCounts()
        return raw.map((r) => ({
            className: `${r._id.className} ${r._id.section}`,
            grade: r._id.grade as number,
            count: r.count as number,
            maleCount: r.maleCount as number,
            femaleCount: r.femaleCount as number,
        }))
    })

    static admissionTrend = cache(async (months: number = 12) => {
        await connectDB()
        const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const raw = await StudentModel.admissionTrend(months)
        return raw.map((r) => ({
            month: `${MONTH_NAMES[r._id.month as number]} ${r._id.year}`,
            count: r.count as number,
        }))
    })

    static statusBreakdown = cache(async () => {
        await connectDB()
        const raw = await StudentModel.statusBreakdown()
        return raw.map((r) => ({
            status: r._id as string,
            count: r.count as number,
        }))
    })
}
